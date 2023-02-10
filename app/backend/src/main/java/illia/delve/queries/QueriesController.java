package illia.delve.queries;

import com.google.cloud.bigquery.FieldValue;
import com.google.cloud.bigquery.FieldValueList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

@CrossOrigin(maxAge = 3600)
@RestController
public class QueriesController {
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private BigQueryService bigQueryService;

    @GetMapping("/")
    public String getSettings() {
        ArrayList<Setting> settings = new ArrayList<>();

        for(FieldValueList row : bigQueryService.getTableColumns()) {
            String name = row.get(0).getValue().toString();
            String type = row.get(1).getValue().toString();

            settings.add(new Setting(name, type));
        }

        return settings.toString();
    }

    @PostMapping("/")
    public String getUsers(@RequestBody Query query) {
            ArrayList<ArrayList<String>> usersData = new ArrayList<>();

            for(FieldValueList row : bigQueryService.getFields(query.getQueries(), query.getGroupBy())) {
                ArrayList<String> userData = new ArrayList<>();
                for(FieldValue fieldValue : row) {
                    userData.add("\"" + fieldValue.getValue().toString() + "\"");
                }
                usersData.add(userData);
            }

            return usersData.toString();
    }
}
