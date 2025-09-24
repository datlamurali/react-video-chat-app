import React, { useState } from "react";
import VideoPlayer from "../components/video/VideoPlayer";
import ChatInterface from "../components/chat/ChatInterface";

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
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Fullscreen Video */}
      <div className="absolute inset-0 z-0">
        <VideoPlayer 
          videoUrl={videoUrl} 
          onVideoChange={setVideoUrl}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Chat Interface overlays on top of video */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
        <ChatInterface 
          messages={messages}
          onSendMessage={addMessage}
        />
      </div>
    </div>
  );
}