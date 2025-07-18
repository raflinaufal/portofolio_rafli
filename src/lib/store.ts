import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import chatReducer from './slices/chatSlice'
import themeReducer from './slices/themeSlice'
import sidebarReducer from './slices/sidebarSlice'
import homeContentReducer from './slices/homeContentSlice'
import projectReducer from './slices/projectSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    theme: themeReducer,
    sidebar: sidebarReducer,
    homeContent: homeContentReducer,
    project: projectReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 