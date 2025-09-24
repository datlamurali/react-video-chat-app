import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send, Loader2, X } from "lucide-react";
import { InvokeLLM } from "../../integrations/Core";
import MessageBubble from "./MessageBubble";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";


export default function ChatInterface({ messages, onSendMessage, showOverlay, setShowOverlay }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText("");
    onSendMessage(userMessage, false);
    setIsLoading(true);

    try {
      const response = await InvokeLLM({
        prompt: `You are ChatGPT, a large language model by OpenAI. You are having a friendly and helpful conversation with a user who is watching a YouTube video. Keep your responses concise and engaging. User's message: "${userMessage}"`
      });

      onSendMessage(response, true);
    } catch (error) {
      onSendMessage("I'm sorry, I encountered an error. Please try again!", true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => setShowOverlay(false),
    onSwipedRight: () => setShowOverlay(false),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false
  });

  const handleFocus = () => setShowOverlay(true);
  
  return (
    <div className="relative h-full w-full overflow-x-hidden">
      {/* Chat History Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            {...swipeHandlers}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-slate-950/95 px-4 pt-4 pb-24 overflow-y-auto space-y-3 z-[9999] rounded-t-2xl shadow-xl"
          >
            {/* Messages */}
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-start"
              >
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">ChatGPT is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close Button - Always Visible */}
      {showOverlay && (
        <div className="fixed top-1 right-5 z-[10000]">
          <Button
            variant="ghost"
            onClick={() => setShowOverlay(false)}
            className="text-white hover:text-red-400 p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Input Area - Always Visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950 text-slate-950 p-4 border-t border-slate-200/50 z-[10000]">
        <div className="flex gap-3 items-end w-full max-w-full box-border">
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={handleFocus}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="bg-slate-950 text-slate-50 px-4 py-3 text-base flex h-10 w-full max-w-full border ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-slate-200 focus:border-blue-400 rounded-2xl resize-none"
              disabled={isLoading}
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-4 py-3 min-w-[48px] h-12"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
