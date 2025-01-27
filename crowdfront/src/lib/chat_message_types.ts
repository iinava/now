// Base Types
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  
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
  
  // GET /chat/
  export interface GetChatsListResponse {
    status: boolean;
    code: string;
    data: PaginatedResponse<Chat>;
    message: string;
  }
  
  export interface GetChatsListPaginatedResponse extends PaginatedResponse<Chat> {}
  
  // POST /chat/create/
  export interface CreateChatRequest {
    receiver: number;
  }
  
  export interface CreateChatResponse {
    status: boolean;
    code: string;
    data: Chat;
    message: string;
  }
  
  // GET /chat/{chat_id}/messages/
  export interface GetMessagesResponse {
    status: string;
    data: GetMessagesPaginatedResponse;
    error: null | string;
  }
  
  export interface GetMessagesPaginatedResponse extends PaginatedResponse<Message> {}
  
  // POST /chat/{chat_id}/messages/create/
  export interface CreateMessageRequest {
    content: string;
  }
  
  export interface CreateMessageResponse {
    status: string;
    data: Message;
    error: null | string;
  }
  
  // Error Responses
  export interface ErrorResponse {
    status: string | boolean;
    data: null;
    error: string;
  }