import mongoose from "mongoose";
import { Chat } from "../models/chat.model.js";
import enhanceQuery from "../utils/enhanceQuery.js";

// 1. send a message
const sendMessage = async (req, res) => {
  try {
    const { chatId, role, message, model, imageUrl } = req.body;

    if (!chatId || !role || !message) {
      throw new Error("chatId, role and message are required.");
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw new Error("Chat not found.");
    }

    if (chat.conversation.length >= 30) {
      throw new Error("Maximum 30 messages reached. Please start a new chat.");
    }

    const conversationObj = {
      role,
      message,
      model: model || null,
      imageUrl: imageUrl || null,
    };

    chat.conversation.push(conversationObj);
    await chat.save();

    res.status(200).json({ success: true, message: conversationObj });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. create new chat
const createChat = async (req, res) => {
  try {
    const chatName = req.body?.chatName;

    const existingChatsNumber = await Chat.countDocuments();
    if (existingChatsNumber >= 5) {
      throw new Error("Maximum 5 chats reached");
    }

    const newChat = await Chat.create({
      chatName: chatName ? chatName : "Untitled",
      conversation: [],
    });

    res.status(200).json({ success: true, chat: newChat });
  } catch (error) {
    console.error("Error in createChat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. rewrite query
const rewriteQuery = async (req, res) => {
  try {
    const { details } = req.body;
    const enhancedQuery = await enhanceQuery(details);

    if (!enhancedQuery) {
      throw new Error(`Error enhancing query...`);
    }

    res.status(200).json({ success: true, enhancedQuery });
  } catch (error) {
    console.error("Error in rewriteQuery:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. get all chats
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error in getAllChats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. fetch messages
const fetchMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw new Error("Chat not found.");
    }

    res.status(200).json({ success: true, messages: chat.conversation });
  } catch (error) {
    console.error("Error in fetchMessages:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { sendMessage, createChat, rewriteQuery, getAllChats, fetchMessages };
