package com.ajinkya.workflowoptimizer.engine;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class NodeExecutorRegistry {

    private final Map<String, NodeExecutor> executors = new HashMap<>();

    public NodeExecutorRegistry(List<NodeExecutor> executorList) {
        for (NodeExecutor executor : executorList) {
            executors.put(executor.getType(), executor);
        }
    }

    public NodeExecutor getExecutor(String type) {
        return executors.get(type);
    }
}