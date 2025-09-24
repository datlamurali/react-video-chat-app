import React from "react";
import { motion } from "framer-motion";
import { Aperture, User } from "lucide-react";

export default function MessageBubble({ message }) {
  const { text, isAi, timestamp } = message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      {isAi && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Aperture className="w-5 h-5 text-white" />
        </div>
      )}

      <div className="bg-slate-950 text-slate-800 px-4 py-3 max-w-xs lg:max-w-sm rounded-2xl shadow-sm border border-slate-100 rounded-bl-md">
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
        <div className="bg-slate-950 text-slate-50 mt-2 text-xs opacity-70">
          {timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {!isAi && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </motion.div>
  );
}
