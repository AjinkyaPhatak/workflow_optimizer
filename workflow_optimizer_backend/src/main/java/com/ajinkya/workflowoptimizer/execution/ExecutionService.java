package com.ajinkya.workflowoptimizer.execution;

import com.ajinkya.workflowoptimizer.engine.WorkflowExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ExecutionService {

    private final WorkflowExecutor workflowExecutor;
    private final WorkflowRunRepository workflowRunRepository;

    public void executeWorkflow(Long workflowId) throws Exception {

        WorkflowRun run = new WorkflowRun();
        run.setWorkflowId(workflowId);
        run.setStatus("RUNNING");
        run.setStartedAt(LocalDateTime.now());

        workflowRunRepository.save(run);

        try {
            workflowExecutor.execute(workflowId);
            run.setStatus("SUCCESS");
        } catch (Exception e) {
            run.setStatus("FAILED");
            throw e;
        } finally {
            run.setFinishedAt(LocalDateTime.now());
            workflowRunRepository.save(run);
        }
    }
}