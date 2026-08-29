'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "How do I report an issue?",
  "What are the biggest problems in my city?",
  "Show me active hotspots",
  "How can I track my report?",
];

export function CivicAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Map history for Gemini
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const res = await fetch('/api/civic-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsDemoMode(false);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback Demo Mode logic
      setIsDemoMode(true);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm currently running in Demo Mode. To report an issue, click 'Report Issue', upload a photo, and Civic Eye AI will help analyze the problem.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          >
            <div className="hidden md:flex items-center bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-xl">
              <span className="text-sm font-semibold text-zinc-300">Ask Civic AI</span>
            </div>
            
            <button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-gradient-to-tr from-[#ff4a1c] to-[#ff2a00] text-white shadow-xl shadow-[#ff4a1c]/30 flex items-center justify-center hover:scale-105 transition-transform border border-white/10 cursor-pointer"
            >
              <Sparkles className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-32px)] md:w-[400px] h-[600px] max-h-[calc(100vh-32px)] flex flex-col bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-[#ff4a1c]/20 flex items-center justify-center border border-[#ff4a1c]/30">
                    <Bot className="h-5 w-5 text-[#ff4a1c]" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-black rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight flex items-center gap-1.5">
                    Civic AI <Sparkles className="h-3 w-3 text-[#ff4a1c]" />
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                      Your City's AI Assistant
                    </p>
                    {isDemoMode && (
                      <span className="text-[8px] bg-[#ff4a1c]/20 text-[#ff4a1c] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-[#ff4a1c]/30">
                        Demo Mode
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
            >
              {/* Welcome Message */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#ff4a1c]/20 flex shrink-0 items-center justify-center mt-1">
                    <Bot className="h-3 w-3 text-[#ff4a1c]" />
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-zinc-200">
                    Hi! I'm Civic AI. I can help you understand civic issues, explore your city, and answer questions about Civic Eye.
                  </div>
                </div>
                
                {messages.length === 0 && (
                  <div className="flex flex-wrap gap-2 pl-8 mt-2">
                    {SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(suggestion)}
                        className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer text-left"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Message History */}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-2 max-w-[85%]",
                    msg.role === 'user' ? "self-end flex-row-reverse" : "self-start"
                  )}
                >
                  <div className={cn(
                    "h-6 w-6 rounded-full flex shrink-0 items-center justify-center mt-1",
                    msg.role === 'user' ? "bg-zinc-800" : "bg-[#ff4a1c]/20"
                  )}>
                    {msg.role === 'user' ? (
                      <User className="h-3 w-3 text-zinc-400" />
                    ) : (
                      <Bot className="h-3 w-3 text-[#ff4a1c]" />
                    )}
                  </div>
                  <div className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    msg.role === 'user' 
                      ? "bg-[#ff4a1c] text-white rounded-tr-sm" 
                      : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-sm"
                  )}>
                    {msg.content}
                    <div className={cn(
                      "text-[9px] mt-1 text-right font-medium",
                      msg.role === 'user' ? "text-white/70" : "text-zinc-500"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2 self-start">
                  <div className="h-6 w-6 rounded-full bg-[#ff4a1c]/20 flex shrink-0 items-center justify-center mt-1">
                    <Bot className="h-3 w-3 text-[#ff4a1c]" />
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    <motion.div className="h-1.5 w-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="h-1.5 w-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="h-1.5 w-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/5 border-t border-white/10 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 150))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend(input);
                  }}
                  disabled={isTyping}
                  placeholder="Ask a question..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder:text-zinc-500 outline-hidden focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30 disabled:opacity-50 transition-all"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 h-9 w-9 rounded-full bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 disabled:bg-zinc-800 disabled:text-zinc-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 -ml-0.5 mt-0.5" />}
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 px-2">
                <span className="text-[10px] text-zinc-500 font-medium tracking-wide">
                  AI responses can be inaccurate.
                </span>
                <span className="text-[10px] text-zinc-500 font-medium">
                  {input.length}/150
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
