package illia.delve.queries;

import java.util.ArrayList;
import java.util.UUID;

import com.google.cloud.bigquery.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class BigQueryServiceImpl implements BigQueryService {
    @Autowired
    private BigQuery bigquery;
    @Value("${spring.cloud.gcp.bigquery.tableName}")
    private String tableName;

    @Value("${spring.cloud.gcp.bigquery.datasetName}")
    private String datasetName;

    @Value("${spring.cloud.gcp.project-id}")
    private String projectName;

    private String createQuery(ArrayList<String> columnFields, ArrayList<String> groupByFields) {
        String queryString = "SELECT " + String.join(", ", columnFields) + " FROM " + projectName + "." + datasetName + "." + tableName;

        if (groupByFields.size() > 0) {
            queryString += " GROUP BY " + String.join(",", groupByFields);
        }

        queryString += " LIMIT 1000";

        return queryString;
    }

    private boolean checkQueryFields(ArrayList<String> columnFields, ArrayList<String> groupByFields) {
        for (String field : columnFields) {
            if (StringUtils.containsWhitespace(field)) {
                return false;
            }

            if (field.matches(".*[;,=]+.*")) {
                return false;
            }
        }

        for (String field : groupByFields) {
            if (StringUtils.containsWhitespace(field)) {
                return false;
            }

            if (field.matches(".*[;,=]+.*")) {
                return false;
            }
        }

        return true;
    }

    @Override
    public Iterable<FieldValueList> getTableColumns() {
        String queryString = "" +
                "SELECT " +
                    "column_name, " +
                    "data_type " +
                "FROM " +
                    projectName + "." + datasetName + ".INFORMATION_SCHEMA.COLUMNS " +
                "WHERE " +
                    "TABLE_NAME = '" + tableName + "';";

        return query(queryString);
    }

    @Override
    public Iterable<FieldValueList> getFields(ArrayList<String> columnFields, ArrayList<String> groupByFields) throws RuntimeException {
        if (!checkQueryFields(columnFields, groupByFields)) {
            throw new RuntimeException("Error with the query fields");
        }

        return query(createQuery(columnFields, groupByFields));
    }

    private Iterable<FieldValueList> query(String queryString) {
        QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder(queryString).setUseLegacySql(false).build();

        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob = this.bigquery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());

        try {
            queryJob = queryJob.waitFor();
        } catch (InterruptedException e) {
            throw new RuntimeException("Error while waiting for bigquery job");
        }

        if (queryJob == null) {
            throw new RuntimeException("Job no longer exists");
        } else if (queryJob.getStatus().getError() != null) {
            throw new RuntimeException(queryJob.getStatus().getError().toString());
        }

        try {
            return queryJob.getQueryResults().iterateAll();
        } catch (InterruptedException e) {
            throw new RuntimeException("Error while getting query results");
        }
    }
}
