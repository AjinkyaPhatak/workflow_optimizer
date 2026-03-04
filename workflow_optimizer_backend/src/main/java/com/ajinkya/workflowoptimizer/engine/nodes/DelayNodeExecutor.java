package com.ajinkya.workflowoptimizer.engine.nodes;

import com.ajinkya.workflowoptimizer.engine.*;
import org.springframework.stereotype.Component;

@Component
public class DelayNodeExecutor implements NodeExecutor {

    @Override
    public String getType() {
        return "DELAY";
    }

    @Override
    public void execute(NodeExecutionContext context, NodeDefinition node) {

        Object secondsObj = node.getConfig().get("seconds");

        if (secondsObj instanceof Integer seconds) {
            try {
                Thread.sleep(seconds * 1000L);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}