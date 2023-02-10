package illia.delve.queries;

import com.google.cloud.bigquery.FieldValueList;

import java.util.ArrayList;

public interface BigQueryService {
    Iterable<FieldValueList> getTableColumns();

    Iterable<FieldValueList> getFields(ArrayList<String> columnFields, ArrayList<String> groupByFields);
}
