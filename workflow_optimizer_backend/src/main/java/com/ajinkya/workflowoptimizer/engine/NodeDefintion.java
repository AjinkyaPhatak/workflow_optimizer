package com.ajinkya.workflowoptimizer.engine;

import java.util.Map;

public class NodeDefinition {

    private String id;
    private String type;
    private Map<String, Object> config;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Map<String, Object> getConfig() { return config; }
    public void setConfig(Map<String, Object> config) { this.config = config; }
}