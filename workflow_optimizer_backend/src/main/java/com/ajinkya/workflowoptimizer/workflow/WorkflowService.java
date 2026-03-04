package com.ajinkya.workflowoptimizer.workflow;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkflowService {

    private final WorkflowRepository workflowRepository;

    public Workflow createWorkflow(Workflow workflow) {
        workflow.setActive(true);
        return workflowRepository.save(workflow);
    }

    public Workflow getWorkflow(Long id) {
        return workflowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workflow not found"));
    }
}