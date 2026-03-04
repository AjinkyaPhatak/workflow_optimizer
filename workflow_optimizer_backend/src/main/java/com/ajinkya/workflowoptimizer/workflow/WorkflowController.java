package com.ajinkya.workflowoptimizer.workflow;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workflows")
@RequiredArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @PostMapping
    public Workflow create(@RequestBody Workflow workflow) {
        return workflowService.createWorkflow(workflow);
    }

    @GetMapping("/{id}")
    public Workflow get(@PathVariable Long id) {
        return workflowService.getWorkflow(id);
    }
}