package com.ajinkya.WorkflowOptimizerApi.execution;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.ArrayList;

@Repository
public class ExecutionRepository {
    public List<Execution> findAll() {
        Execution execution1 = new Execution();
        execution1.setId(1L);
        execution1.setWorkflowId(1L);
        execution1.setStatus("RUNNING");
        execution1.setStartTime(java.time.LocalDateTime.now());
        
        Execution execution2 = new Execution();
        execution2.setId(2L);
        execution2.setWorkflowId(2L);
        execution2.setStatus("COMPLETED");
        execution2.setStartTime(java.time.LocalDateTime.now().minusHours(2));
        execution2.setEndTime(java.time.LocalDateTime.now().minusHours(1));

        return java.util.Arrays.asList(execution1, execution2);
    }
}
