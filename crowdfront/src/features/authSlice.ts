import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../lib/constants";
import { LoginRequest, UserRegistrationRequest, UpdateProfileRequest, UserResponse } from "../lib/types";
import API_ENDPOINTS from "../api/endpoints";
import { RootState } from "../store";

// Define the types for the state
interface AuthState {
  isAuthorized: boolean | null;
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
}


// Login action
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, thunkAPI) => {
    try {
      const response = await api.post(API_ENDPOINTS.auth.login, credentials);
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Register action
export const register = createAsyncThunk(
  "auth/register",
  async (userData: UserRegistrationRequest, thunkAPI) => {
    try {
      const response = await api.post(API_ENDPOINTS.auth.register, userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Get profile action
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await api.get<any>(API_ENDPOINTS.auth.profile);   
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

// Update profile action
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updateData: UpdateProfileRequest, thunkAPI) => {
    try {
      const response = await api.put<any>(API_ENDPOINTS.auth.update, updateData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update profile");
    }
  }
);

// Check auth action
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    const isLoggedIn = localStorage.getItem('IS_LOGGED_IN') === 'true';
    
    if (!isLoggedIn) {
      return thunkAPI.rejectWithValue("Not logged in");
    }

    return { isLoggedIn };
  }
);

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthorized: null,
    user: null,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.setItem('isLoggedIn', 'false');
      state.isAuthorized = false;
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        localStorage.setItem('isLoggedIn', 'true');
        state.isAuthorized = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthorized = false;
        state.loading = false;
        state.error = action.payload as string;
      })

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Existing checkAuth cases...
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isAuthorized = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuthorized = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthorized = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
export const user = (state: any) => state.auth.user;

// Add selectors for authentication
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading; 
export const selectAuthError = (state: RootState) => state.auth.error; 
