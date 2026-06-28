"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot } from "lucide-react";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hi! I'm your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "IT Consulting services",
    "Corporate location & info",
    "Software solutions overview"
  ];

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

  const streamReply = (fullText: string, currentMessages: { role: string; content: string }[]) => {
    setIsTyping(false);
    
    // Add empty assistant message placeholder to stream into
    setMessages([...currentMessages, { role: "assistant", content: "" }]);
    
    const words = fullText.split(" ");
    let index = 0;
    let currentText = "";
    
    const interval = setInterval(() => {
      if (index < words.length) {
        currentText += (index === 0 ? "" : " ") + words[index];
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = { role: "assistant", content: currentText };
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
    const newMessages = [...messages, { role: "user", content: messageText }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      if (data.reply) {
        streamReply(data.reply, newMessages);
      } else {
        setIsTyping(false);
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="mb-4"
          >
            <Card className="w-80 h-96 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-card/95 backdrop-blur-md border border-border rounded-2xl overflow-hidden">
              
              {/* Header */}
              <CardHeader className="bg-[#0057D9]/5 border-b border-border py-3.5 px-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-[#0057D9]/10 flex items-center justify-center text-[#0057D9]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <CardTitle className="text-base font-extrabold text-[#0A1F44] tracking-tight">Jeshurun AI</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full hover:bg-slate-100 text-muted-foreground" onClick={() => setIsOpen(false)} aria-label="Close Chatbot">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs font-semibold leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-[#0057D9] text-white rounded-br-sm" 
                        : "bg-slate-100 text-foreground rounded-bl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl p-3 text-xs font-semibold bg-slate-100 text-muted-foreground rounded-bl-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </CardContent>

              {/* Chat Input & Suggestion Chips */}
              <div className="p-3 border-t border-border space-y-3 bg-card">
                {/* Suggestion Chips */}
                {!isTyping && (
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
                    {suggestionChips.map((chip, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className="flex-shrink-0 text-[10px] font-bold text-muted-foreground bg-background border border-border rounded-lg px-2.5 py-1 hover:border-[#0057D9] hover:text-[#0057D9] hover:bg-[#0057D9]/5 transition-all duration-200"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Input form */}
                <form onSubmit={handleSend} className="flex gap-2">
                  <Input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Ask me anything..." 
                    disabled={isTyping}
                    className="flex-1 bg-[#F8FAFC]/50 border border-border focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] h-10 text-xs rounded-xl"
                  />
                  <Button type="submit" size="sm" disabled={isTyping || !input.trim()} className="bg-[#0057D9] hover:bg-[#2563EB] text-white font-bold h-10 w-10 p-0 rounded-xl flex items-center justify-center">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </div>

            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            className="h-14 w-14 rounded-full shadow-[0_10px_30px_rgba(0,87,217,0.22)] bg-[#0057D9] hover:bg-[#2563EB] text-white flex items-center justify-center transition-all duration-300" 
            onClick={() => setIsOpen(true)}
            aria-label="Toggle Chatbot"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
