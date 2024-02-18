import { configureStore } from "@reduxjs/toolkit";
import responseReducer from "./ResponseSlice";
import chatReducer from "./ChatSlice";
export const store = configureStore({
  reducer: {
    response: responseReducer,
    chats: chatReducer,
  },
});
