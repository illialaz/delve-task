package illia.delve.queries;

import com.google.api.gax.core.CredentialsProvider;
import com.google.cloud.bigquery.BigQuery;
import com.google.cloud.bigquery.BigQueryOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class BigQueryConfig {
    @Autowired
    private CredentialsProvider credentialsProvider;

    @Bean
    public BigQuery getBigQuery() throws IOException {
       return BigQueryOptions.newBuilder().setCredentials(credentialsProvider.getCredentials()).build().getService();
    }
}
