import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMessages: [],
};

export const ChatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.allMessages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.allMessages = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { sendMessage, setMessages } = ChatSlice.actions;

export default ChatSlice.reducer;
