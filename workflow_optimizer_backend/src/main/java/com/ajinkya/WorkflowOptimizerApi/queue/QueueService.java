package com.ajinkya.WorkflowOptimizerApi.queue;

import org.springframework.stereotype.Service;

@Service
public class QueueService {

    public String getQueueStatus() {
        return "Queue is running normally";
    }
}
