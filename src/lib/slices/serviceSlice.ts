import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Service {
  id: number;
  title: string;
  description: string;
  tools: string;
  icon: string;
}

interface ServiceState {
  data: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  "service/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/dashboard/service");
      const json = await res.json();
      return json as Service[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default serviceSlice.reducer;
