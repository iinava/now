import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../lib/constants";
import { jwtDecode } from "jwt-decode";

// Define the types for the state
interface AuthState {
  isAuthorized: boolean | null;
}

interface TokenResponse {
  access: string;
}

// Define the async thunk for checking authentication
export const checkAuth:any = createAsyncThunk<
  { accessToken: string } | undefined, // Return type
  void, // Argument type
  { rejectValue: string } // Reject value type
>(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token available");
    }

    try {
      const decoded = jwtDecode<any>(accessToken); // Use `any` for decoding the JWT token
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now && refreshToken) {
        const res = await api.post<TokenResponse>("/api/user/refresh/", { refresh: refreshToken });

        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          return { accessToken: res.data.access };
        } else {
          return thunkAPI.rejectWithValue("Unable to refresh token");
        }
      } else if (tokenExpiration >= now) {
        return { accessToken };
      } else {
        return thunkAPI.rejectWithValue("Token expired and no refresh token available");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthorized: null,
  } as AuthState, // Type for the initial state
  reducers: {
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state) => {
      state.isAuthorized = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action: PayloadAction<{ accessToken: string } | undefined>) => {
      if (action.payload) {
        state.isAuthorized = true;
      } else {
        state.isAuthorized = false;
      }
    });
    builder.addCase(checkAuth.rejected, (state, action: PayloadAction<string>) => {
      if (action.payload) {
        console.log("Authentication failed:", action.payload); // Optionally log the error
      }
      state.isAuthorized = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
