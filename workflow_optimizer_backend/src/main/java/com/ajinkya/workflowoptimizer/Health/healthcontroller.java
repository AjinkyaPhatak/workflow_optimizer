package com.ajinkya.workflowoptimizer.Health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class healthcontroller {

    @GetMapping("/api/health")
    public String health() {
        return "Workflow Engine Running";
    }
}