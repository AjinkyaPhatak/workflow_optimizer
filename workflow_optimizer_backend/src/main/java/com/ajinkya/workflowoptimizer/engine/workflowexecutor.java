package com.ajinkya.workflowoptimizer.engine;

import com.ajinkya.workflowoptimizer.workflow.Workflow;
import com.ajinkya.workflowoptimizer.workflow.WorkflowRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkflowExecutor {

    private final WorkflowRepository workflowRepository;
    private final NodeExecutorRegistry registry;
    private final ObjectMapper objectMapper;

    public void execute(Long workflowId) throws Exception {

        Workflow workflow = workflowRepository.findById(workflowId)
                .orElseThrow(() -> new RuntimeException("Workflow not found"));

        WorkflowDefinition definition =
                objectMapper.readValue(workflow.getDefinitionJson(), WorkflowDefinition.class);

        NodeExecutionContext context =
                new NodeExecutionContext(workflowId);

        for (NodeDefinition node : definition.getNodes()) {

            NodeExecutor executor = registry.getExecutor(node.getType());

            if (executor == null) {
                throw new RuntimeException("Unknown node type: " + node.getType());
            }

            executor.execute(context, node);
        }
    }
}