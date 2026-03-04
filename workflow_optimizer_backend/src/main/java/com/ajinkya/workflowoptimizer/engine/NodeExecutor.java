package com.ajinkya.workflowoptimizer.engine;

public interface NodeExecutor {

    String getType();

    void execute(NodeExecutionContext context, NodeDefinition node);
}