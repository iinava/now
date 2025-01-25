// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  phone_number: string;
  full_name: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  full_name: string;
}


// / Profile Update Request
export interface UpdateProfileRequest {
  username?: string;
  email?: string;
  phone_number?: string;
  full_name?: string;
}

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  detailed_description: string | null;
  created_at: string;
  updated_at: string;
  owner: string;
}

export interface ProjectCreateRequest {
  title: string;
  description: string;
  image?: File;
  detailed_description?: string;
}

export interface ProjectUpdateRequest {
  title?: string;
  description?: string;
  image?: File;
  detailed_description?: string;
}

// Chat Types
export interface Message {
  id: number;
  chat: number;
  sender: string;
  content: string;
  created_at: string;
}

export interface Chat {
  id: number;
  sender: string;
  receiver: number;
  created_at: string;
  last_message: Message | null;
}

export interface ChatCreateRequest {
  receiver: number;
}

export interface MessageCreateRequest {
  content: string;
} 