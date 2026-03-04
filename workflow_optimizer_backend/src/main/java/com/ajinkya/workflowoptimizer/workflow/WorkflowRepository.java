package com.ajinkya.workflowoptimizer.workflow;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRepository extends JpaRepository<Workflow, Long> {
}