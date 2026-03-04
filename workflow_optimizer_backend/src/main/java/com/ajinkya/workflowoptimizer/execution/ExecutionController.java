package com.ajinkya.workflowoptimizer.execution;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workflows")
@RequiredArgsConstructor
public class ExecutionController {

    private final ExecutionService executionService;

    @PostMapping("/{id}/execute")
    public String execute(@PathVariable Long id) throws Exception {
        executionService.executeWorkflow(id);
        return "Execution completed";
    }
}