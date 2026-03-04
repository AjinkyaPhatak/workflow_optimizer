package main.java.com.ajinkya.workflowoptimizer.execution;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "workflow_runs")
public class WorkflowRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long workflowId;

    private String status;

    private LocalDateTime startedAt;

    private LocalDateTime finishedAt;

    public Long getId() { return id; }

    public Long getWorkflowId() { return workflowId; }

    public String getStatus() { return status; }

    public LocalDateTime getStartedAt() { return startedAt; }

    public LocalDateTime getFinishedAt() { return finishedAt; }

    public void setWorkflowId(Long workflowId) { this.workflowId = workflowId; }

    public void setStatus(String status) { this.status = status; }

    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public void setFinishedAt(LocalDateTime finishedAt) { this.finishedAt = finishedAt; }
}