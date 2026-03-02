"use client";

import { useEffect, useState } from "react";
import { getExecutions, type Execution } from "@/lib/api";

export default function ExecutionsPage() {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getExecutions()
      .then(setExecutions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 4 }}>
          Executions
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Track and monitor workflow execution runs
        </p>
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
        ) : executions.length === 0 ? (
          <div className="empty-state" style={{ padding: "64px 24px" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <p style={{ fontSize: "1rem", marginTop: 8 }}>
              No executions recorded
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginTop: 4,
              }}
            >
              Executions will appear here once a workflow is run
            </p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Workflow</th>
                <th>Status</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {executions.map((ex, i) => (
                <tr
                  key={ex.id}
                  className="animate-slide-in"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <td>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      #{ex.id}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{ fontWeight: 500, color: "var(--text-primary)" }}
                    >
                      Workflow #{ex.workflowId}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={ex.status} />
                  </td>
                  <td>
                    {ex.startTime
                      ? new Date(ex.startTime).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    {ex.endTime ? new Date(ex.endTime).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status?.toLowerCase() || "pending";
  let className = "badge badge-pending";
  if (s === "running") className = "badge badge-running";
  else if (s === "completed") className = "badge badge-completed";
  else if (s === "failed") className = "badge badge-failed";
  return <span className={className}>{status || "Pending"}</span>;
}
