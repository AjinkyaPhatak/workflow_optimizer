// API client for Workflow Optimizer Backend

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// --- Types ---

export interface Workflow {
  id: number;
  name: string;
  description: string;
}

export interface Node {
  id: number;
  name: string;
  type: string;
}

export interface Execution {
  id: number;
  workflowId: number;
  status: string;
  startTime: string | null;
  endTime: string | null;
}

export interface QueueStatus {
  status: string;
}

// --- Fetch helper ---

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  // Handle empty responses (204 etc.)
  const text = await res.text();
  if (!text) return {} as T;

  return JSON.parse(text) as T;
}

// --- Workflow API ---

export async function getWorkflows(): Promise<Workflow[]> {
  return apiFetch<Workflow[]>("/workflows");
}

export async function getWorkflow(id: number): Promise<Workflow> {
  return apiFetch<Workflow>(`/workflows/${id}`);
}

export async function createWorkflow(
  data: Omit<Workflow, "id">,
): Promise<Workflow> {
  return apiFetch<Workflow>("/workflows", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// --- Node API ---

export async function getNodes(): Promise<Node[]> {
  return apiFetch<Node[]>("/nodes");
}

export async function getNode(id: number): Promise<Node> {
  return apiFetch<Node>(`/nodes/${id}`);
}

// --- Execution API ---

export async function getExecutions(): Promise<Execution[]> {
  return apiFetch<Execution[]>("/executions");
}

export async function getExecution(id: number): Promise<Execution> {
  return apiFetch<Execution>(`/executions/${id}`);
}

// --- Queue API ---

export async function getQueueStatus(): Promise<string> {
  return apiFetch<string>("/queue/status");
}

// --- Auth API ---

export async function login(): Promise<string> {
  return apiFetch<string>("/auth/login", { method: "POST" });
}
