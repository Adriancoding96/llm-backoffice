import {
  type LoginRequest,
  type LoginResponse,
  type SignupRequest,
  type PromptRecord,
  type PromptRequest,
  type PromptResponse,
  type ResponseRecord,
} from "./types"

const API_BASE_URL: string   = "http://localhost:8080";

let token: string | null = null;

export function setToken(newToken: string): void {
  token = newToken;

  if(newToken) {
    localStorage.setItem("jwtToken", newToken);
  } else {
    localStorage.removeItem("jwtToken");
  }
}

export function getToken(): string | null {
  if(!token) {
    token = localStorage.getItem("jwtToken");
  }
  return token;
}

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if(token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return fetchJson<LoginResponse>(`${API_BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password } as LoginRequest),
  });
}

export async function signup(name: string, email: string, password: string): Promise<void> {
  return fetchJson<void>(`${API_BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password } as SignupRequest),
  });
}

export async function getAllPrompts(): Promise<PromptRecord[]> {
  return fetchJson<PromptRecord[]>(`${API_BASE_URL}/api/prompt/`);
}

export async function getPromptById(id: string): Promise<PromptRecord> {
  return fetchJson<PromptRecord>(`${API_BASE_URL}/api/prompt/${id}`);
}
  
export async function createPromp(promptRequest: PromptRequest): Promise<PromptResponse> {
  return fetchJson<PromptResponse>(`${API_BASE_URL}/api/prompt/new`, {
    method: "POST",
    body: JSON.stringify(promptRequest),
  });
}

export async function deletePromptById(id: string): Promise<void> {
  return fetchJson<void>(`${API_BASE_URL}/api/prompt/${id}`, {
    method: "DELETE",
  });
}

export async function getAllResponses(): Promise<ResponseRecord[]> {
  return fetchJson<ResponseRecord[]>(`${API_BASE_URL}/api/response/`);
}

export async function getResponseById(id: string): Promise<ResponseRecord> {
  return fetchJson<ResponseRecord>(`${API_BASE_URL}/api/response/${id}`);
}

export async function createResponse(responseRecord: ResponseRecord): Promise<void> {
    return fetchJson<void>(`${API_BASE_URL}/api/response/new`, {
        method: 'POST',
        body: JSON.stringify(responseRecord),
    });
}

export async function deleteResponseById(id: string): Promise<void> {
    return fetchJson<void>(`${API_BASE_URL}/api/response/${id}`, {
        method: 'DELETE',
    });
}
