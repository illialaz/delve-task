package illia.delve.queries;

import java.util.ArrayList;

public class Query {
    private ArrayList<String> queries;
    private ArrayList<String> groupBy;

    public ArrayList<String> getQueries() {
        return queries;
    }

    public ArrayList<String> getGroupBy() {
        return groupBy;
    }

    public void setGroupBy(ArrayList<String> groupBy) {
        this.groupBy = groupBy;
    }

    public void setQueries(ArrayList<String> queries) {
        this.queries = queries;
    }
}
