"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, RotateCcw, CornerDownRight, CornerRightUp, ArrowRight } from "lucide-react";

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

function AIIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Letter A */}
      <path d="M6.5 7.5L9.5 14.5L12.5 7.5" />
      <path d="M7.8 11.5H11.2" />
      
      {/* Letter I */}
      <path d="M16 7.5V14.5" />
      
      {/* Corner arrow underneath pointing right */}
      <path d="M5.5 16.5V19.5H14.5" />
      <path d="M12 17L14.5 19.5L12 22" />
    </svg>
  );
}

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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }
      
      const data = await res.json();
      streamReply(data.reply, data.quickReplies || [], newMessages);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages([...newMessages, { role: "assistant", content: "Sorry, an error occurred while connecting to the server.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
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
            <Card className="w-[340px] sm:w-[360px] h-[500px] flex flex-col shadow-2xl bg-card border border-border rounded-2xl overflow-hidden">
              
              {/* Header — Minimal & Restrained */}
              <div className="border-b border-border/60 py-3 px-4 flex flex-row items-center justify-between z-10 bg-card">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground font-black text-xs flex items-center justify-center tracking-tight shadow-sm select-none">
                    AI
                  </div>
                  <span className="text-sm font-extrabold text-foreground tracking-tight">Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg hover:bg-secondary text-muted-foreground" onClick={clearConversation} aria-label="Clear Conversation" title="Clear Conversation">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg hover:bg-secondary text-muted-foreground" onClick={() => setIsOpen(false)} aria-label="Close Chatbot">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Content Body */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                {mounted && messages.map((msg, i) => {
                  const isInitialGreeting = i === 0 && msg.role === "assistant";

                  if (isInitialGreeting) {
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="py-2"
                      >
                        <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                          {msg.content}
                        </p>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} space-y-1`}
                    >
                      <div className={`p-3 text-sm font-medium leading-relaxed max-w-[85%] ${
                        msg.role === "user" 
                          ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-sm" 
                          : "bg-muted text-foreground rounded-2xl rounded-bl-sm border border-border/60 shadow-sm"
                      }`}>
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium px-1">
                        {msg.timestamp}
                      </span>
                    </motion.div>
                  );
                })}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start space-y-1"
                  >
                    <div className="bg-muted rounded-2xl rounded-bl-sm border border-border/60 p-3 shadow-sm flex items-center gap-1.5 h-[38px]">
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                    </div>
                  </motion.div>
                )}
                
                {/* Outlined Vertical Stack Quick Action Chips */}
                <AnimatePresence>
                  {currentChips.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-2 pt-2 select-none"
                    >
                      {currentChips.map((chip, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className="w-full text-left text-xs font-semibold text-primary dark:text-blue-400 bg-transparent border border-primary/30 dark:border-primary/40 rounded-xl px-3.5 py-2.5 hover:bg-primary/10 transition-colors duration-200 flex items-center justify-between group cursor-pointer"
                        >
                          <span>{chip}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={chatEndRef} />
              </CardContent>

              {/* Flattened Input Area */}
              <div className="p-3 border-t border-border bg-card">
                <form onSubmit={handleSend} className="relative flex items-center w-full">
                  <Input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type a message..." 
                    disabled={isTyping}
                    className="w-full bg-background/60 border border-border focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary h-11 text-sm rounded-xl pl-4 pr-10"
                  />
                  <button 
                    type="submit" 
                    disabled={isTyping || !input.trim()} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 disabled:opacity-30 p-1.5 transition-colors cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
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
            className="h-10 w-10 rounded-full shadow-[0_8px_20px_rgba(0,87,217,0.3)] bg-[#0057D9] hover:bg-[#2563EB] text-white flex flex-col items-center justify-center transition-all duration-300 relative group cursor-pointer border border-white/10" 
            onClick={() => {
              setIsOpen(true);
              setHasUnread(false);
            }}
            aria-label="Open AI chat assistant"
          >
            <div className="flex flex-col items-center justify-center -space-y-0.5 pointer-events-none">
              <span className="text-[9px] font-black tracking-tight leading-none uppercase text-white select-none">
                AI
              </span>
              <CornerDownRight className="w-2.5 h-2.5 text-white/90" />
            </div>
            {hasUnread && (
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-background rounded-full"></span>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
