import React, { useState, useEffect } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  PlusCircleIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, setCurrentChat, createNewChat } from "../../../redux/slices/authSlice.js";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Example: get 'id' from ?id=123
  const chatId = queryParams.get('chat');

  const { chats, loadingChats, error, userData, currentChat } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleCreateNewChat = async () => {
    try {
      const newChat = await dispatch(createNewChat()).unwrap();
      if (newChat && newChat._id) {
        // Optionally redirect to the new chat
        // navigate(`/user?chat=${newChat._id}`);
      }
    } catch (err) {
      console.error("Error creating new chat:", err);
    }
  };

  return (
    <aside
      className={`flex flex-col bg-[#0f0f0f] text-gray-100 h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-72"
      } border-r border-gray-800`}
    >
      {/* Header */}
      <div
        className={`flex items-center ${
          collapsed ? "justify-center px-4 py-6" : "justify-between px-6 py-6"
        } border-b border-gray-800`}
      >
        {!collapsed && (
          <h2 className="text-lg font-bold text-white tracking-wide">
            Projects
          </h2>
        )}
        
        <button
          title="New Project"
          className="p-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Create New Project"
          onClick={handleCreateNewChat}
        >
          <PlusCircleIcon className="h-5 w-5" />
        </button>
      </div>

      {/* {
      console.log("current Chat: ", chats

      )} */}

      {/* Chats List */}
      <nav
        className={`flex-1 overflow-y-auto ${
          collapsed ? "px-2 mt-4" : "px-4 mt-4"
        }`}
      >
        {loadingChats ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-red-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {chats && chats.length > 0 ? (
              chats.map((chat) => (
                <li key={chat._id}>
                  <Link
                    to={`/user?chat=${chat._id}`}
                    onClick={() => dispatch(setCurrentChat(chat))}
                    className={`flex items-center gap-3 rounded-lg p-3 transition-colors duration-200 cursor-pointer group relative ${
                      collapsed ? "justify-center" : ""
                    } ${
                      currentChat && chatId === chat._id
                        ? "bg-red-600/15 border-l-2 border-red-500 text-white"
                        : "hover:bg-gray-800 border-l-2 border-transparent"
                    }`}
                    title={collapsed ? chat.chatName : ""}
                  >
                    <div className={`p-1.5 rounded-md transition-colors duration-200 ${
                      currentChat && currentChat._id === chat._id
                        ? "bg-red-600/30"
                        : "bg-gray-800 group-hover:bg-red-600/20"
                    }`}>
                      <ChatBubbleLeftEllipsisIcon className={`h-4 w-4 transition-colors duration-200 ${
                        currentChat && currentChat._id === chat._id
                          ? "text-red-300"
                          : "text-red-400"
                      }`} />
                    </div>
                    
                    {!collapsed && (
                      <span className={`flex-1 font-medium text-sm truncate transition-colors duration-200 ${
                        currentChat && currentChat._id === chat._id
                          ? "text-white"
                          : "text-gray-200 group-hover:text-white"
                      }`}>
                        {chat.chatName}
                      </span>
                    )}
                  </Link>
                </li>
              ))
            ) : (
              !collapsed && (
                <div className="text-center py-12">
                  <div className="p-3 rounded-lg bg-gray-800/50 inline-block mb-3">
                    <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-sm">No projects yet</p>
                  <p className="text-gray-600 text-xs mt-1">Create your first project above</p>
                </div>
              )
            )}
          </ul>
        )}
      </nav>

      {/* User Profile */}
      <div
        className={`border-t border-gray-800 ${
          collapsed ? "p-4" : "p-6"
        }`}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } group`}
        >
          <div className="relative">
            <UserCircleIcon className="h-10 w-10 text-red-500" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {userData?.name || "Guest User"}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {userData?.email || "guest@example.com"}
              </p>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`${
            collapsed ? "w-full mt-4" : "w-full mt-4"
          } p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600`}
        >
          <div className="flex items-center justify-center gap-2">
            {collapsed ? (
              <ChevronRightIcon className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="text-xs font-medium">Collapse</span>
              </>
            )}
          </div>
        </button>
      </div>
    </aside>
  );
}