import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface HomeContent {
  id: number;
  name: string;
  title: string;
  location: string;
  isRemote: boolean;
  description: string;
  updatedAt: string;
}

interface HomeContentState {
  data: HomeContent[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeContentState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchHomeContent = createAsyncThunk(
  'homeContent/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/dashboard/home');
      const json = await res.json();
      return json.homeContent as HomeContent[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const homeContentSlice = createSlice({
  name: 'homeContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeContent.fulfilled, (state, action: PayloadAction<HomeContent[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchHomeContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeContentSlice.reducer; 