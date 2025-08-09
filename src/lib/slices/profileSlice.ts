import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Profile {
  name?: string;
  image?: string;
  bio?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  githubUsername?: string;
}

interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk("profile/fetch", async () => {
  const res = await fetch("/api/dashboard/about");
  if (!res.ok) throw new Error("Failed to fetch profile");
  return await res.json();
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch profile";
      });
  },
});

export default profileSlice.reducer;
