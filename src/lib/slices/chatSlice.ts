import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Message {
  id: string
  content: string
  userId: string
  userName: string
  userImage: string
  createdAt: string
}

interface ChatState {
  messages: Message[]
  loading: boolean
  connected: boolean
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  connected: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
    clearMessages: (state) => {
      state.messages = []
    },
  },
})

export const { setMessages, addMessage, setLoading, setConnected, clearMessages } = chatSlice.actions
export default chatSlice.reducer 