package illia.delve.queries;

public class Setting {
    private String name;
    private String type;

    public Setting(String name, String type) {
        this.name = name;
        this.type = type;
    }

    @Override
    public String toString() {
        return "{\"name\": \"" + this.name + "\", \"type\": \"" + this.type + "\"}";
    }
}
