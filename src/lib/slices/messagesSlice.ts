import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/types/message";

interface MessagesState {
  data: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchMessages = createAsyncThunk(
  "messages/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/dashboard/messages");
      if (!res.ok) throw new Error("Failed to fetch messages");
      return (await res.json()) as Message[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<Message[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default messagesSlice.reducer;
