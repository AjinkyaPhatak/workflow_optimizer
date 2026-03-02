package com.ajinkya.WorkflowOptimizerApi.execution;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExecutionService {

    private final ExecutionRepository executionRepository;

    public ExecutionService(ExecutionRepository executionRepository) {
        this.executionRepository = executionRepository;
    }

    public List<Execution> getAllExecutions() {
        return executionRepository.findAll();
    }
}
