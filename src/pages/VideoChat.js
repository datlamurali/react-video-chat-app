import React, { useState } from "react";
import VideoPlayer from "../components/video/VideoPlayer";
import ChatInterface from "../components/chat/ChatInterface";
import MessageBubble from "../components/chat/MessageBubble";


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
  const [showOverlay, setShowOverlay] = useState(false);

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
      {/* Video Player */}
      <div className="absolute inset-0 z-0">
        <VideoPlayer videoUrl={videoUrl} onVideoChange={setVideoUrl} />
      </div>

      {/* Chat Input */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-slate-950 p-4 border-t border-slate-200/50">
        <ChatInterface
          messages={messages}
          onSendMessage={addMessage}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
        />
      </div>
    </div>
  );
}