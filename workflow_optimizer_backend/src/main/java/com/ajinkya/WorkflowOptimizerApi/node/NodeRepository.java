package com.ajinkya.WorkflowOptimizerApi.node;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.ArrayList;

@Repository
public class NodeRepository {
    public List<Node> findAll() {
        Node node1 = new Node();
        node1.setId(1L);
        node1.setName("Data Extractor");
        node1.setType("SOURCE");

        Node node2 = new Node();
        node2.setId(2L);
        node2.setName("Data Transformer");
        node2.setType("PROCESSOR");

        return java.util.Arrays.asList(node1, node2);
    }
}
