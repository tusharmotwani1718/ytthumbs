import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  PaperAirplaneIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { addMessageInChat, fetchMessages } from "../../../redux/slices/authSlice.js";
import axios from "axios";

/* ------------------ Thumbnail Questionnaire ------------------ */
function ThumbnailQuestions({ onSubmit, submitting }) {
  const [niche, setNiche] = useState("");
  const [purpose, setPurpose] = useState("");
  const [colorPref, setColorPref] = useState("");
  const [textOnThumbnail, setTextOnThumbnail] = useState("no");
  const [thumbnailText, setThumbnailText] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [keepOutfit, setKeepOutfit] = useState("no");
  const [removeBackground, setRemoveBackground] = useState("no");
  const [extraText, setExtraText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      category: niche,
      purposeOfThumbnail: purpose,
      colorPreferences: colorPref,
      wantTextOnThumbnail: textOnThumbnail === "yes",
      titleOfVideo: videoTitle,
      targetAudience,
      keepCurrentOutfit: keepOutfit === "yes",
      removeBackground: removeBackground === "yes",
      extraText,
    });
  };

  // Reusable radio toggle component
  const RadioToggle = ({ label, state, setState }) => (
    <div className="flex gap-4">
      {["yes", "no"].map((val) => (
        <button
          key={val}
          type="button"
          onClick={() => setState(val)}
          className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
            state === val
              ? "bg-red-600 border-red-600 text-white"
              : "bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500"
          }`}
        >
          {val === "yes" ? "Yes" : "No"}
        </button>
      ))}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-[#111] rounded-2xl border border-gray-800"
    >
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white">Thumbnail Preferences</h3>
        <p className="text-xs text-gray-400">Tell us about your requirements</p>
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Niche */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">
            Niche / Category
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select...</option>
            <option>Tech</option>
            <option>Health/Fitness</option>
            <option>Food/Cooking</option>
            <option>Travel</option>
            <option>Finance</option>
            <option>Gaming</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Lifestyle</option>
            <option>Motivation/Personal Growth</option>
            <option>Other</option>
          </select>
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">
            Thumbnail Purpose
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select...</option>
            <option>Catch attention (clickbait-style)</option>
            <option>Look professional/clean</option>
            <option>Be educational/informative</option>
            <option>Be fun/entertaining</option>
            <option>Build trust/authority</option>
          </select>
        </div>
      </div>

      {/* Color & Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color Preference */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">
            Color Preference
          </label>
          <select
            value={colorPref}
            onChange={(e) => setColorPref(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select...</option>
            <option>Bright/contrasting</option>
            <option>Cool tones (blue, purple)</option>
            <option>Warm tones (orange, red)</option>
            <option>Dark/edgy (black, neon)</option>
            <option>No preference</option>
          </select>
        </div>

        {/* Audience */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">
            Target Audience
          </label>
          <select
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select...</option>
            <option>Teenagers</option>
            <option>Young adults</option>
            <option>Professionals</option>
            <option>General audience</option>
            <option>Kids</option>
          </select>
        </div>
      </div>

      {/* Video Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-1">
          Video Title
        </label>
        <input
          type="text"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-red-500"
          placeholder="Enter your video title..."
          required
        />
      </div>

      {/* Text on Thumbnail */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Include Text on Thumbnail?
        </label>
        <RadioToggle state={textOnThumbnail} setState={setTextOnThumbnail} />
        {textOnThumbnail === "yes" && (
          <input
            type="text"
            value={thumbnailText}
            onChange={(e) => setThumbnailText(e.target.value)}
            className="mt-3 w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-red-500"
            placeholder="Text to display..."
            required
          />
        )}
      </div>

      {/* Outfit & BG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Keep Current Outfit?
          </label>
          <RadioToggle state={keepOutfit} setState={setKeepOutfit} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Remove Background?
          </label>
          <RadioToggle state={removeBackground} setState={setRemoveBackground} />
        </div>
      </div>

      {/* Extra Text */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-1">
          Extra Text (optional)
        </label>
        <input
          type="text"
          value={extraText}
          onChange={(e) => setExtraText(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-red-500"
          placeholder="Any additional requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full p-3 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            Generating...
          </div>
        ) : (
          "Generate Thumbnail"
        )}
      </button>
    </form>
  );
}

/* ------------------ Main Chats ------------------ */
// Main Chats component
export default function Chats() {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chat");
  const dispatch = useDispatch();
  const { chats, currentChat, loadingMessages } = useSelector((state) => state.auth);

  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submittingPreferences, setSubmittingPreferences] = useState(false);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);

  // Chat name editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  const fileInputRef = useRef(null);
  const editInputRef = useRef(null);
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  useEffect(() => {
    if (chatId) dispatch(fetchMessages(chatId));
  }, [chatId, dispatch]);

  // Initialize edited name when chat changes
  useEffect(() => {
    const currentChatData = chats.find((c) => c._id === chatId);
    if (currentChatData) {
      setEditedName(currentChatData.chatName || "Untitled Chat");
    }
  }, [chatId, chats]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditingName && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditingName]);

  // Handle chat name edit
  const handleStartEdit = () => {
    setIsEditingName(true);
  };

  const handleSaveEdit = async () => {
    if (!editedName.trim() || !chatId) return;

    try {
      // API call to update chat name (you'll need to implement this endpoint)
      await axios.put(`http://localhost:3001/api/chats/${chatId}`, {
        chatName: editedName.trim()
      });

      // Update local state or refetch chats
      // dispatch(updateChatName({ chatId, newName: editedName.trim() }));

      setIsEditingName(false);
    } catch (err) {
      console.error("Error updating chat name:", err);
      // Reset to original name on error
      const currentChatData = chats.find((c) => c._id === chatId);
      setEditedName(currentChatData?.chatName || "Untitled Chat");
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    const currentChatData = chats.find((c) => c._id === chatId);
    setEditedName(currentChatData?.chatName || "Untitled Chat");
    setIsEditingName(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  // Send normal message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatId || sending) return;
    setSending(true);
    try {
      const res = await axios.post("http://localhost:3001/api/chats/sendMessage", { chatId, role: "user", message: newMessage });
      dispatch(addMessageInChat({ chatId, message: res.data.message }));
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  // File upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !chatId) return;

    if (!allowedTypes.includes(file.type)) {
      setUploadMessage("Invalid file type. Only JPG, PNG, WEBP are allowed.");
      fileInputRef.current.value = null;
      return;
    }

    setUploading(true);
    setUploadMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("http://localhost:3001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setUploadedImage(res.data.url);
        setUploadMessage("Image uploaded successfully!");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setUploadMessage("Failed to upload image.");
    } finally {
      setUploading(false);
      fileInputRef.current.value = null;
    }
  };

  // Submit questionnaire and generate thumbnail
  const handleQuestionnaireSubmit = async (answers) => {
    if (!uploadedImage || !chatId) return;
    setSubmittingPreferences(true);

    try {
      // 1️⃣ Generate enhanced query
      const promptRes = await axios.post("http://localhost:3001/api/chats/enhanceQuery", { details: answers });
      const generatedPrompt = promptRes.data.enhancedQuery;

      // 2️⃣ Append user message
      const userMessage = {
        role: "user",
        message: generatedPrompt,
        imageUrl: uploadedImage,
        model: "openai",
      };

      await axios.post("http://localhost:3001/api/chats/sendMessage", { chatId, ...userMessage });
      dispatch(addMessageInChat({ chatId, message: userMessage }));

      // 3️⃣ Generate thumbnail via dedicated route
      setGeneratingThumbnail(true);
      const thumbnailRes = await axios.post("http://localhost:3001/api/chats/generateImage", {
        imageUrl: uploadedImage,
        promptText: generatedPrompt,
      });

      const cloudinaryUrl = thumbnailRes.data.cloudinaryUrl;

      // 4️⃣ Append bot message with generated thumbnail
      const botMessage = {
        role: "bot",
        message: "Generated thumbnail",
        imageUrl: cloudinaryUrl,
        model: "nano banana",
      };

      await axios.post("http://localhost:3001/api/chats/sendMessage", { chatId, ...botMessage });
      dispatch(addMessageInChat({ chatId, message: botMessage }));

      // 5️⃣ Reset
      setUploadedImage(null);
      setUploadMessage("");
    } catch (err) {
      console.error("Error submitting preferences:", err);
    } finally {
      setSubmittingPreferences(false);
      setGeneratingThumbnail(false);
    }
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0f0f0f]">
        <div className="text-center">
          <div className="p-4 rounded-full bg-gray-800 inline-block mb-4">
            <PaperClipIcon className="h-8 w-8 text-gray-600" />
          </div>
          <p className="text-gray-400 text-lg">Select a project to start</p>
          <p className="text-gray-600 text-sm mt-1">Choose a project from the sidebar</p>
        </div>
      </div>
    );
  }

  const currentChatData = chats.find((c) => c._id === chatId);

  return (
    <div className="flex flex-col flex-1 h-screen bg-[#0f0f0f] text-gray-100">
      {/* Header with Editable Chat Name */}
      <div className="px-6 py-5 border-b border-gray-800 bg-[#1a1a1a]">
        <div className="flex items-center gap-3">
          {isEditingName ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                ref={editInputRef}
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                onClick={handleSaveEdit}
                className="p-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-colors duration-200"
                title="Save"
              >
                <CheckIcon className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white transition-colors duration-200"
                title="Cancel"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-1 group">
              <h2 className="text-xl font-bold text-white">
                {currentChatData?.chatName || "Untitled Chat"}
              </h2>
              <button
                onClick={handleStartEdit}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-200"
                title="Edit chat name"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {loadingMessages ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-red-500 border-t-transparent"></div>
          </div>
        ) : currentChat && currentChat.length > 0 ? (
          currentChat.map((msg, idx) => msg && (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md px-4 py-3 rounded-2xl ${msg.role === "user"
                  ? "bg-red-600 text-white"
                  : "bg-[#1a1a1a] text-gray-100 border border-gray-800"
                }`}>
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="attachment"
                    className="rounded-lg mb-3 h-auto object-cover w-full"
                  />
                )}
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="p-4 rounded-full bg-gray-800/50 inline-block mb-4">
                <PaperClipIcon className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg">No messages yet</p>
              <p className="text-gray-600 text-sm mt-1">Upload an image to start creating thumbnails</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {uploadMessage && (
        <div className="px-6 py-2">
          <p className={`text-sm ${uploadMessage.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {uploadMessage}
          </p>
        </div>
      )}

      {(uploading || generatingThumbnail) && (
        <div className="px-6 py-2">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-500 border-t-transparent"></div>
            <p className="text-sm text-yellow-400">
              {uploading ? "Uploading image..." : "Generating thumbnail..."}
            </p>
          </div>
        </div>
      )}

      {/* Message Input + File Upload */}
      <div className="border-t border-gray-800 p-4 bg-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <label className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white cursor-pointer transition-colors duration-200 border border-gray-700">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              disabled={uploading || submittingPreferences || generatingThumbnail}
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
            />
            <PaperClipIcon className="h-5 w-5" />
          </label>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            disabled={sending || submittingPreferences || uploadedImage || generatingThumbnail}
            className="flex-1 rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
          />

          <button
            onClick={handleSendMessage}
            disabled={sending || (!newMessage.trim() && !uploadedImage) || submittingPreferences || generatingThumbnail}
            className="p-3 bg-red-600 hover:bg-red-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
            )}
          </button>
        </div>
      </div>

      {/* Render questionnaire after image upload */}
      {uploadedImage && !generatingThumbnail && (
        <div className="p-4 bg-[#0f0f0f] max-h-96 overflow-y-auto border-t border-gray-800">
          <ThumbnailQuestions onSubmit={handleQuestionnaireSubmit} submitting={submittingPreferences} />
        </div>
      )}
    </div>
  );
}
