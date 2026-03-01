package com.ajinkya.WorkflowOptimizerApi.node;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NodeService {

    private final NodeRepository nodeRepository;

    public NodeService(NodeRepository nodeRepository) {
        this.nodeRepository = nodeRepository;
    }

    public List<Node> getAllNodes() {
        return nodeRepository.findAll();
    }
}
