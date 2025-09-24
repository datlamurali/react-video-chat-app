import React, { useState } from "react";
import VideoPlayer from "./components/video/VideoPlayer";
import ChatInterface from "./components/chat/ChatInterface";

export default function VideoChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Corning: Unparalleled Expertise. Chat with me here!",
      isAi: true,
      timestamp: new Date()
    }
  ]);
  
  const [videoUrl, setVideoUrl] = useState("https://youtu.be/6pxRHBw-k8M");

  const addMessage = (text, isAi = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      isAi,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Video Section - 80% */}
      <div className="h-4/5 relative">
        <VideoPlayer 
          videoUrl={videoUrl} 
          onVideoChange={setVideoUrl}
        />
      </div>
      
      {/* Chat Section - 20% */}
      <div className="h-1/5 border-t border-slate-200/50 backdrop-blur-sm bg-black/80">
        <ChatInterface 
          messages={messages}
          onSendMessage={addMessage}
        />
      </div>
    </div>
  );
}
