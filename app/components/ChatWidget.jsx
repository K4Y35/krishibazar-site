"use client";
import { useState, useEffect, useRef } from "react";
import { useSiteContext } from "../context/SiteContext";
import io from "socket.io-client";
import {
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaHeadset,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";

export default function ChatWidget() {
  const { isAuthenticated, user, setUser } = useSiteContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onlineAdmins, setOnlineAdmins] = useState(0);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Connect to socket server
    const newSocket = io("http://localhost:4000");

    newSocket.on("connect", () => {
      console.log("Connected to chat server");
      // Send auth after connection
      newSocket.emit("auth", {
        userId: user.id,
        userType: "user",
        name: `${user.first_name} ${user.last_name}`,
      });
    });

    newSocket.on("message", (data) => {
      console.log("Received message:", data);
      setMessages((prev) => [
        ...prev,
        {
          id: data.id || Date.now(),
          message: data.message,
          senderType: data.senderType,
          sender_type: data.sender_type,
          senderName: data.senderName || "Admin",
          sender_name: data.sender_name,
          createdAt: data.createdAt,
          created_at: data.created_at,
          isRead: false,
        },
      ]);
      setIsTyping(false);
      // Auto scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    newSocket.on("message-sent", (data) => {
      console.log("Message confirmed sent:", data);
    });

    newSocket.on("admin-online", (count) => {
      console.log("Admins online:", count);
      setOnlineAdmins(count);
    });

    newSocket.on("typing", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // Fetch previous messages
    fetchMessages();

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `/api/user/chat/messages?sender_id=${user?.id}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessages(data.data || []);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    const messageData = {
      senderId: user.id,
      senderType: "user",
      senderName: `${user.first_name} ${user.last_name}`,
      message: newMessage.trim(),
      createdAt: new Date().toISOString(),
      receiverId: null, // Broadcast to all admins
    };

    console.log("Sending message:", messageData);
    socket.emit("send-message", messageData);
    setNewMessage("");

    // Add message optimistically
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: messageData.message,
        senderType: "user",
        senderName: `${user.first_name} ${user.last_name}`,
        createdAt: messageData.createdAt,
        isRead: false,
      },
    ]);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat with admin"
      >
        <div className="relative">
          <FaCommentDots className="text-2xl" />
          {onlineAdmins > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {onlineAdmins}
            </span>
          )}
        </div>
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-700 rounded-full p-2">
                <FaHeadset />
              </div>
              <div>
                <h3 className="font-semibold">Support Chat</h3>
                {onlineAdmins > 0 ? (
                  <p className="text-xs text-green-200">
                    {onlineAdmins} admin{onlineAdmins > 1 ? "s" : ""} online
                  </p>
                ) : (
                  <p className="text-xs text-green-200">No admins online</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-700 rounded p-1 transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <FaCommentDots className="mx-auto text-4xl text-gray-300 mb-3" />
                <p className="text-gray-600">No messages yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  Start a conversation with our support team
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => {
                  // Check both senderType and sender_type for compatibility
                  const isUser = msg.senderType === "user" || msg.sender_type === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          isUser
                            ? "bg-green-600 text-white rounded-br-sm"
                            : "bg-white text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm"
                        }`}
                      >
                        {!isUser && msg.sender_name && (
                          <p className="text-xs font-semibold mb-1 text-green-600">
                            {msg.sender_name}
                          </p>
                        )}
                        <p className={`text-sm whitespace-pre-wrap ${isUser ? 'text-white' : 'text-gray-800'}`}>
                          {msg.message}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            isUser ? "text-green-100" : "text-gray-500"
                          }`}
                        >
                          {msg.created_at ? new Date(msg.created_at).toLocaleTimeString() : 
                           msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ''}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-200">
                      <p className="text-sm text-gray-500 italic">
                        Admin is typing...
                      </p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

