"use client";

import { useEffect, useState } from "react";
import {
  getWorkflows,
  getExecutions,
  type Workflow,
  type Execution,
} from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [w, e] = await Promise.allSettled([
          getWorkflows(),
          getExecutions(),
        ]);
        if (w.status === "fulfilled") setWorkflows(w.value);
        if (e.status === "fulfilled") setExecutions(e.value);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const runningCount = executions.filter(
    (e) => e.status?.toLowerCase() === "running",
  ).length;
  const completedCount = executions.filter(
    (e) => e.status?.toLowerCase() === "completed",
  ).length;
  const failedCount = executions.filter(
    (e) => e.status?.toLowerCase() === "failed",
  ).length;

  const stats = [
    {
      label: "Total Workflows",
      value: workflows.length,
      gradient: "var(--gradient-primary)",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Running",
      value: runningCount,
      gradient: "var(--gradient-cyan)",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: completedCount,
      gradient: "var(--gradient-emerald)",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    {
      label: "Failed",
      value: failedCount,
      gradient: "var(--gradient-rose)",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 4 }}>
          Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Overview of your workflow operations
        </p>
      </div>

      {/* Error Banner */}
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
          ⚠ {error} — Make sure the backend is running on port 8080.
        </div>
      )}

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
          marginBottom: 36,
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="card animate-fade-in"
            style={{
              padding: 24,
              animationDelay: `${i * 80}ms`,
              animationFillMode: "backwards",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </span>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: stat.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {loading ? (
                <div className="skeleton" style={{ width: 48, height: 32 }} />
              ) : (
                stat.value
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Two columns: Recent Workflows + Recent Executions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* --- Workflows --- */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              Recent Workflows
            </h2>
            <Link
              href="/workflows"
              style={{
                fontSize: "0.8rem",
                color: "var(--accent-indigo)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View all →
            </Link>
          </div>
          <div
            style={{
              padding: workflows.length === 0 && !loading ? 0 : undefined,
            }}
          >
            {loading ? (
              <div
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="skeleton"
                    style={{ height: 48, width: "100%" }}
                  />
                ))}
              </div>
            ) : workflows.length === 0 ? (
              <div className="empty-state">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <p style={{ fontSize: "0.85rem" }}>No workflows yet</p>
              </div>
            ) : (
              <div>
                {workflows.slice(0, 5).map((wf, i) => (
                  <div
                    key={wf.id}
                    className="animate-slide-in"
                    style={{
                      padding: "14px 24px",
                      borderBottom:
                        i < Math.min(workflows.length, 5) - 1
                          ? "1px solid rgba(99, 102, 241, 0.07)"
                          : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      animationDelay: `${i * 60}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--gradient-primary)",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                        }}
                      >
                        {wf.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          marginTop: 2,
                        }}
                      >
                        {wf.description || "No description"}
                      </div>
                    </div>
                    <span
                      style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                    >
                      #{wf.id}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- Executions --- */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              Recent Executions
            </h2>
            <Link
              href="/executions"
              style={{
                fontSize: "0.8rem",
                color: "var(--accent-indigo)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View all →
            </Link>
          </div>
          <div>
            {loading ? (
              <div
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="skeleton"
                    style={{ height: 48, width: "100%" }}
                  />
                ))}
              </div>
            ) : executions.length === 0 ? (
              <div className="empty-state">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <p style={{ fontSize: "0.85rem" }}>No executions yet</p>
              </div>
            ) : (
              <div>
                {executions.slice(0, 5).map((ex, i) => (
                  <div
                    key={ex.id}
                    className="animate-slide-in"
                    style={{
                      padding: "14px 24px",
                      borderBottom:
                        i < Math.min(executions.length, 5) - 1
                          ? "1px solid rgba(99, 102, 241, 0.07)"
                          : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      animationDelay: `${i * 60}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <StatusBadge status={ex.status} />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                        }}
                      >
                        Execution #{ex.id}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          marginTop: 2,
                        }}
                      >
                        Workflow #{ex.workflowId}
                      </div>
                    </div>
                    {ex.startTime && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {new Date(ex.startTime).toLocaleString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
