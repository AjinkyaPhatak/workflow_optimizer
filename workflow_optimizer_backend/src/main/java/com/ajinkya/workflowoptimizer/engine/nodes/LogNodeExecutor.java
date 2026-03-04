package com.ajinkya.workflowoptimizer.engine.nodes;

import com.ajinkya.workflowoptimizer.engine.*;
import org.springframework.stereotype.Component;

@Component
public class LogNodeExecutor implements NodeExecutor {

    @Override
    public String getType() {
        return "LOG";
    }

    @Override
    public void execute(NodeExecutionContext context, NodeDefinition node) {
        Object message = node.getConfig().get("message");
        System.out.println("Workflow " + context.getWorkflowId() + " LOG: " + message);
    }
}