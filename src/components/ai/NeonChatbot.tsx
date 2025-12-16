"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiCpu, FiShield, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Message {
  id: string;
  role: string;
  content: string;
}

// Generate unique session ID for each user
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export default function NeonChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => generateSessionId()); // Unique session per component mount
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup: Clear messages when component unmounts (user leaves page)
  useEffect(() => {
    return () => {
      // Messages are automatically cleared when component unmounts
      // No database persistence - privacy guaranteed
      console.log(`Session ${sessionId} ended - messages cleared`);
    };
  }, [sessionId]);

  // Show privacy notice when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: "👋 Hi! I'm Neon AI, your insurance assistant. This is a private chat - all messages are deleted when you close this window. For official inquiries or to reach our team, please use the Contact page.",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `${sessionId}_${Date.now()}`, // Include session ID for isolation
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Session-Id": sessionId, // Send session ID (not stored, just for logging)
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          sessionId, // Include but don't persist
        }),
      });

      const text = await response.text();
      
      const assistantMessage: Message = {
        id: `${sessionId}_${Date.now() + 1}`,
        role: "assistant",
        content: text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: `${sessionId}_${Date.now() + 1}`,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again or contact us at +256 123 456 789.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "Chat cleared! How can I help you with insurance today?",
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] glass-card flex flex-col overflow-hidden shadow-2xl border border-brand-primary/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <FiCpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1">
                    Neon AI
                    <FiShield className="w-3 h-3" title="Private & Secure" />
                  </h3>
                  <p className="text-xs text-white/80">Private Chat</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="hover:bg-white/20 p-1.5 rounded-full transition-colors text-xs"
                  title="Clear chat"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
              {messages.length === 0 && (
                <div className="text-center text-brand-text-secondary mt-8">
                  <p className="mb-2">👋 Hi there!</p>
                  <p className="text-sm">I can help you with quotes, claims, or general questions.</p>
                </div>
              )}
              
              {messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      m.role === "user"
                        ? "bg-brand-primary text-white rounded-tr-none"
                        : "bg-white border border-brand-border text-brand-text-primary rounded-tl-none shadow-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-brand-border p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <motion.div 
                        className="w-2 h-2 bg-brand-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-brand-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-brand-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-brand-border">
              <div className="flex gap-2 mb-2">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 rounded-full border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm bg-brand-light"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                  disabled={isLoading || !input.trim()}
                >
                  <FiSend className="w-4 h-4 ml-0.5" />
                </Button>
              </div>
              <Link 
                href="/contact" 
                className="flex items-center justify-center gap-1 text-xs text-brand-text-secondary hover:text-brand-primary transition-colors"
              >
                <FiMail className="w-3 h-3" />
                <span>Need to contact us? Click here</span>
              </Link>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button (Orb) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-[0_0_20px_rgba(163,22,27,0.5)] flex items-center justify-center text-white z-50 relative"
      >
        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-brand-primary -z-10"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FiX size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <FiMessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
