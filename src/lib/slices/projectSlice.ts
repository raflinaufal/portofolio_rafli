import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
}

interface ProjectState {
  data: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchLatestProjects = createAsyncThunk(
  'project/fetchLatest',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/dashboard/projects');
      const json = await res.json();
      return json.projects as Project[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer; 