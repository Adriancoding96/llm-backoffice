export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface PromptRecord {
  prompt: string;
  uuid: string;
}

export interface PromptRequest {
  prompt: string;
  model: string;
}

export interface PromptResponse {
  response: string;
  keywords: string[];
  uuid: string;
}

export interface ResponseRecord {
  responseBody: string;
  metaData: string[];
  rating: string;
  promptUuid: string;
}
