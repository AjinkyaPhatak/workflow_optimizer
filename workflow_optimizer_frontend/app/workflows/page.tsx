"use client";

import { useEffect, useState } from "react";
import { getWorkflows, type Workflow } from "@/lib/api";

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWorkflows()
      .then(setWorkflows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 4 }}>
            Workflows
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Manage and monitor your workflow definitions
          </p>
        </div>
        <button className="btn-primary" id="create-workflow-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Workflow
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "12px 20px",
            background: "rgba(244, 63, 94, 0.1)",
            border: "1px solid rgba(244, 63, 94, 0.25)",
            borderRadius: "var(--radius)",
            color: "#fb7185",
            fontSize: "0.875rem",
            marginBottom: 24,
          }}
        >
          ⚠ {error}
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div
            style={{
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="skeleton"
                style={{ height: 56, width: "100%" }}
              />
            ))}
          </div>
        ) : workflows.length === 0 ? (
          <div className="empty-state" style={{ padding: "64px 24px" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <p style={{ fontSize: "1rem", marginTop: 8 }}>
              No workflows defined
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginTop: 4,
              }}
            >
              Create your first workflow to get started
            </p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((wf, i) => (
                <tr
                  key={wf.id}
                  className="animate-slide-in"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <td>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        fontFamily: "monospace",
                      }}
                    >
                      #{wf.id}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{ fontWeight: 500, color: "var(--text-primary)" }}
                    >
                      {wf.name}
                    </span>
                  </td>
                  <td>{wf.description || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
