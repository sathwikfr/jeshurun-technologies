"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, RotateCcw } from "lucide-react";
import { findMatchingResponse } from "@/lib/chatRules";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  quickReplies?: string[];
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi there! 👋 I'm the Jeshurun assistant. Ask me about our services, technology, or how to get in touch.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  quickReplies: ["Our Services", "Pricing & Quotes", "Where You're Based", "Get in Touch"]
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize on mount and restore session
  useEffect(() => {
    setMounted(true);
    
    const savedSession = sessionStorage.getItem("jeshurun_chat_session");
    let initialMessages = [{ ...INITIAL_MESSAGE, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    
    if (savedSession) {
      try {
        const { messages: savedMessages, lastUpdated } = JSON.parse(savedSession);
        const now = Date.now();
        
        // Only restore if less than 10 minutes have passed
        if (now - lastUpdated < 10 * 60 * 1000 && Array.isArray(savedMessages) && savedMessages.length > 0) {
          initialMessages = savedMessages;
          setHasUnread(false);
        } else {
          sessionStorage.removeItem("jeshurun_chat_session");
        }
      } catch (err) {
        console.error("Failed to parse chat session", err);
      }
    }
    
    setMessages(initialMessages);
  }, []);

  // Save to sessionStorage and manage 10-minute inactivity timer
  useEffect(() => {
    if (!mounted) return;
    
    // Save current messages to sessionStorage if there is an actual conversation
    if (messages.length > 1) {
      sessionStorage.setItem("jeshurun_chat_session", JSON.stringify({
        messages,
        lastUpdated: Date.now()
      }));
    }
    
    // 10-minute inactivity timer to clear chat
    if (messages.length <= 1) return;
    
    const timer = setTimeout(() => {
      clearConversation();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
    
    return () => clearTimeout(timer);
  }, [messages, mounted]);

  // Auto-scroll to bottom of messages container
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Toggle body class when chatbot is open/closed
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("chatbot-open");
    } else {
      document.body.classList.remove("chatbot-open");
    }
    return () => {
      document.body.classList.remove("chatbot-open");
    };
  }, [isOpen]);

  // ESC key listener to close chatbot
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const clearConversation = () => {
    const initial = [{ ...INITIAL_MESSAGE, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    setMessages(initial);
    sessionStorage.removeItem("jeshurun_chat_session");
  };

  const streamReply = (fullText: string, quickReplies: string[], currentMessages: Message[]) => {
    setIsTyping(false);
    
    if (!isOpenRef.current) {
      setHasUnread(true);
    }
    
    // Add empty assistant message placeholder to stream into
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([...currentMessages, { role: "assistant", content: "", timestamp, quickReplies: [] }]);
    
    const words = fullText.split(" ");
    let index = 0;
    let currentText = "";
    
    const interval = setInterval(() => {
      if (index < words.length) {
        currentText += (index === 0 ? "" : " ") + words[index];
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = { 
              ...updated[updated.length - 1],
              content: currentText,
              quickReplies: index === words.length - 1 ? quickReplies : [] // Only show chips when done streaming
            };
          }
          return updated;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40); // natural word-by-word speed
  };

  const executeSend = async (messageText: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Remove quickReplies from the previous assistant message
    const updatedMessages = messages.map((m, i) => 
      i === messages.length - 1 ? { ...m, quickReplies: [] } : m
    );

    const newMessages = [...updatedMessages, { role: "user" as const, content: messageText, timestamp }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // Simulate artificial typing delay (700ms) before responding
      setTimeout(() => {
        const { response, quickReplies } = findMatchingResponse(messageText);
        streamReply(response, quickReplies, newMessages);
      }, 700);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages([...newMessages, { role: "assistant", content: "Sorry, an error occurred.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const msg = input.trim();
    setInput("");
    executeSend(msg);
  };

  const handleChipClick = (chipText: string) => {
    if (isTyping) return;
    executeSend(chipText);
  };

  const currentChips = !isTyping && messages.length > 0 && messages[messages.length - 1].role === "assistant" 
    ? messages[messages.length - 1].quickReplies || [] 
    : [];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="mb-4 origin-bottom-right"
          >
            <Card className="w-[340px] h-[480px] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.12)] bg-card/95 backdrop-blur-md border border-border rounded-2xl overflow-hidden">
              
              {/* Header */}
              <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-border py-3.5 px-4 flex flex-row items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-[#0057D9]/10 flex items-center justify-center text-[#0057D9]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-extrabold text-foreground tracking-tight">Jeshurun AI</CardTitle>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 relative">
                        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                      </span>
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground" onClick={clearConversation} aria-label="Clear Conversation" title="Clear Conversation">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground" onClick={() => setIsOpen(false)} aria-label="Close Chatbot">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#FAFBFD] dark:bg-[#0A0C10]">
                {mounted && messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} space-y-1`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {msg.role === "assistant" && (
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0057D9]/10 flex items-center justify-center text-[#0057D9] mb-0.5">
                          <Bot className="w-3 h-3" />
                        </div>
                      )}
                      <div className={`p-3 text-sm font-medium leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-[#0057D9] text-white rounded-2xl rounded-br-sm shadow-sm" 
                          : "bg-white dark:bg-slate-800 text-foreground rounded-2xl rounded-bl-sm border border-slate-100 dark:border-slate-700 shadow-sm"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                    <span className={`text-[10px] text-muted-foreground font-medium px-8 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                      {msg.timestamp}
                    </span>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start space-y-1"
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0057D9]/10 flex items-center justify-center text-[#0057D9] mb-0.5">
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm border border-slate-100 dark:border-slate-700 p-3.5 shadow-sm flex items-center gap-1.5 h-[42px]">
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }} className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </CardContent>

              {/* Chat Input & Suggestion Chips */}
              <div className="p-3 border-t border-border bg-white dark:bg-slate-900 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                {/* Suggestion Chips */}
                <AnimatePresence>
                  {currentChips.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-1.5 pb-3 pt-1 select-none"
                    >
                      {currentChips.map((chip, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className="text-[11px] font-bold text-[#0057D9] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 rounded-full px-3 py-1.5 hover:bg-[#0057D9] hover:text-white dark:hover:bg-blue-600 transition-colors duration-200"
                        >
                          {chip}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Input form */}
                <form onSubmit={handleSend} className="flex gap-2 items-end">
                  <Input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type a message..." 
                    disabled={isTyping}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-visible:ring-1 focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] min-h-[44px] text-sm rounded-xl px-4 py-2"
                  />
                  <Button type="submit" size="sm" disabled={isTyping || !input.trim()} className="bg-[#0057D9] hover:bg-[#2563EB] text-white font-bold h-[44px] w-[44px] p-0 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform active:scale-95">
                    <Send className="w-4 h-4 ml-0.5" />
                  </Button>
                </form>
              </div>

            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className="h-14 w-14 rounded-full shadow-[0_10px_30px_rgba(0,87,217,0.25)] bg-[#0057D9] hover:bg-[#2563EB] text-white flex items-center justify-center transition-colors duration-300 relative group" 
            onClick={() => {
              setIsOpen(true);
              setHasUnread(false);
            }}
            aria-label="Toggle Chatbot"
          >
            <MessageSquare className="w-6 h-6" />
            {hasUnread && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
