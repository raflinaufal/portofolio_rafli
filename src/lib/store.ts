import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
import themeReducer from "./slices/themeSlice";
import sidebarReducer from "./slices/sidebarSlice";
import projectReducer from "./slices/projectSlice";
import serviceReducer from "./slices/serviceSlice";

import profileReducer from "./slices/profileSlice";
import messagesReducer from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    theme: themeReducer,
    sidebar: sidebarReducer,
    project: projectReducer,
    profile: profileReducer,
    service: serviceReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
