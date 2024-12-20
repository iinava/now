import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../lib/api';

interface CampaignDetailsState {
  campaigndetails: Record<string, any>;
  creatordetails: Record<string, any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface CampaignResponse {
  campaign: Record<string, any>;
  profile: Record<string, any>;
}

const initialState: CampaignDetailsState = {
  campaigndetails: {},
  creatordetails: {},
  loading: false,
  error: null,
  success: false,
};

export const fetchcampaigndetails = createAsyncThunk<
  CampaignResponse,  // This is the type of the returned data on successful fetch
  string,            // This is the type of the parameter passed to the thunk
  { rejectValue: string } // This is for the rejected case
>(
  'campaigns/campaigndetails',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/campaign/viewcampaign/${slug}`);
      return response.data.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response?.data || 'Failed to fetch campaigns');
    }
  }
);

const CampaignDetails = createSlice({
  name: 'campaigndetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcampaigndetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchcampaigndetails.fulfilled,
        (state, action: PayloadAction<CampaignResponse>) => {
          state.loading = false;
          state.success = true;
          state.campaigndetails = action.payload.campaign;
          state.creatordetails = action.payload.profile;
        }
      )
      .addCase(
        fetchcampaigndetails.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default CampaignDetails.reducer;
