package main.java.com.ajinkya.workflowoptimizer.engine;

import java.util.List;

public class WorkflowDefinition {

    private List<NodeDefinition> nodes;

    public List<NodeDefinition> getNodes() {
        return nodes;
    }

    public void setNodes(List<NodeDefinition> nodes) {
        this.nodes = nodes;
    }
}