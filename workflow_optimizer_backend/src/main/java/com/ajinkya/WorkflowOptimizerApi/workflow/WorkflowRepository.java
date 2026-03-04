package com.ajinkya.WorkflowOptimizerApi.workflow;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.ArrayList;

@Repository
public class WorkflowRepository {
    public List<Workflow> findAll() {
        Workflow wf1 = new Workflow();
        wf1.setId(1L);
        wf1.setName("Data Processing Pipeline");
        wf1.setDescription("Extracts, transforms, and loads nightly data batches.");

        Workflow wf2 = new Workflow();
        wf2.setId(2L);
        wf2.setName("User Onboarding Process");
        wf2.setDescription("Handles new user registration and initial emails.");

        return java.util.Arrays.asList(wf1, wf2);
    }
}
