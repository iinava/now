import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';
import API_ENDPOINTS from '../api/endpoints';
import { 
  Chat,
  Message,
  CreateChatRequest,
  CreateMessageRequest,
  GetChatsListResponse,
  GetMessagesResponse,
} from '../lib/chat_message_types';
import { RootState } from '../store/store';

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  loading: {
    chats: boolean;
    messages: boolean;
  };
  error: string | null;
  actionLoading: {
    create: boolean;
    send: boolean;
  };
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

const initialState: ChatState = {
  chats: [],
  currentChat: null,
  messages: [],
  loading: {
    chats: false,
    messages: false,
  },
  error: null,
  actionLoading: {
    create: false,
    send: false,
  },
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, thunkAPI) => {
    try {
      const response = await api.get<GetChatsListResponse>(API_ENDPOINTS.chats.list);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch chats');
    }
  }
);

export const createChat = createAsyncThunk(
  'chat/createChat',
  async (data: CreateChatRequest, thunkAPI) => {
    try {
      const response = await api.post(API_ENDPOINTS.chats.create, data);
      // The API should handle both cases:
      // 1. Creating a new chat if it doesn't exist
      // 2. Returning existing chat if it already exists
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to create chat');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatId: number, thunkAPI) => {
    try {
      const response = await api.get<GetMessagesResponse>(
        API_ENDPOINTS.chats.messages.list(chatId)
      );
      console.log(response.data.data,"hha");
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatId, content }: { chatId: number; content: string }, thunkAPI) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.chats.messages.create(chatId),
        { content } as CreateMessageRequest
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to send message');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Chats
      .addCase(fetchChats.pending, (state) => {
        state.loading.chats = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading.chats = false;
        state.chats = action.payload.data.results;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading.chats = false;
        state.error = action.payload as string;
      })
      // Create Chat
      .addCase(createChat.pending, (state) => {
        state.actionLoading.create = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.actionLoading.create = false;
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.actionLoading.create = false;
        state.error = action.payload as string;
      })
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading.messages = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading.messages = false;
        state.messages = action.payload.results;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading.messages = false;
        state.error = action.payload as string;
      })
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.actionLoading.send = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.actionLoading.send = false;
        state.messages.unshift(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.actionLoading.send = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentChat, clearMessages, clearError } = chatSlice.actions;
export default chatSlice.reducer;

// Selectors
export const selectChats = (state: RootState) => state.chat.chats;
export const selectCurrentChat = (state: RootState) => state.chat.currentChat;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectChatsLoading = (state: RootState) => state.chat.loading.chats;
export const selectMessagesLoading = (state: RootState) => state.chat.loading.messages;
export const selectChatError = (state: RootState) => state.chat.error; 