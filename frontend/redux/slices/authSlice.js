import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedin: false,
  userData: null,
  chats: [],
  currentChat: [],
  currentChatId: null,
  loadingChats: false,
  loadingMessages: false,
  error: null,
};

// ✅ Fetch all chats
export const fetchChats = createAsyncThunk(
  "auth/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/api/chats/getAllChats");
      return response.data.chats;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch chats");
    }
  }
);

// ✅ Create a new chat
export const createNewChat = createAsyncThunk(
  "auth/createNewChat",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/chats/createNewChat");
      return response.data.chat;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create chat");
    }
  }
);

// ✅ Fetch messages for a specific chat
// fetch messages
export const fetchMessages = createAsyncThunk(
  "auth/fetchMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/chats/fetchMessages/${chatId}`);
      return { chatId, conversation: res.data.messages || [] };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch messages");
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.userData = null;
      state.chats = [];
      state.currentChat = [];
      state.currentChatId = null;
    },
    addMessageInChat: (state, action) => {
      const { chatId, message } = action.payload;
      
      // Update chats array immutably
      const chatIndex = state.chats.findIndex((chat) => chat._id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].conversation = [
          ...state.chats[chatIndex].conversation,
          message
        ];
      }
      
      // Update currentChat if it's the active chat
      if (chatId === state.currentChatId) {
        state.currentChat = [...state.currentChat, message];
      }
    },
    setCurrentChat: (state, action) => {
      const chat = action.payload;
      state.currentChat = chat?.conversation || [];
      state.currentChatId = chat?._id || null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch chats
      .addCase(fetchChats.pending, (state) => {
        state.loadingChats = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loadingChats = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loadingChats = false;
        state.error = action.payload;
      })
      // create new chat
      .addCase(createNewChat.fulfilled, (state, action) => {
        state.chats = [action.payload, ...state.chats];
      })
      .addCase(createNewChat.rejected, (state, action) => {
        state.error = action.payload;
      })
      // fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loadingMessages = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingMessages = false;
        state.currentChatId = action.payload.chatId;
        state.currentChat = action.payload.conversation;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingMessages = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout, addMessageInChat, setCurrentChat, clearError } = authSlice.actions;
export default authSlice.reducer;