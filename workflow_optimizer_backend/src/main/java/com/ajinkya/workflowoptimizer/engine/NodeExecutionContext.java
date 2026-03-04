package com.ajinkya.workflowoptimizer.engine;

public class NodeExecutionContext {

    private final Long workflowId;

    public NodeExecutionContext(Long workflowId) {
        this.workflowId = workflowId;
    }

    public Long getWorkflowId() {
        return workflowId;
    }
}