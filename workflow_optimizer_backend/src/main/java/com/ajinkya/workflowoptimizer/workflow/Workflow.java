package com.ajinkya.workflowoptimizer.workflow;

import jakarta.persistence.*;

@Entity
@Table(name = "workflows")
public class Workflow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "jsonb")
    private String definitionJson;

    private boolean active;

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getDefinitionJson() { return definitionJson; }

    public boolean isActive() { return active; }

    public void setName(String name) { this.name = name; }

    public void setDefinitionJson(String definitionJson) { this.definitionJson = definitionJson; }

    public void setActive(boolean active) { this.active = active; }
}