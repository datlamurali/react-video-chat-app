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
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Fullscreen Video */}
      <VideoPlayer 
        videoUrl={videoUrl} 
        onVideoChange={setVideoUrl}
        className="w-full h-full"
      />

      {/* Floating Chat Interface */}
      <div className="h-1/5 fixed bottom-0 left-0 right-0 z-[9999]">
        <ChatInterface 
          messages={messages}
          onSendMessage={addMessage}
        />
      </div>
    </div>

    //     <div className="h-screen bg-black flex flex-col overflow-hidden">
    //   {/* Video Section - 80% */}
    //   <div className="h-4/5 relative">
    //     <VideoPlayer 
    //       videoUrl={videoUrl} 
    //       onVideoChange={setVideoUrl}
    //     />
    //   </div>
      
    //   {/* Chat Section - 20% */}
    //   <div className="h-1/5 border-t border-slate-200/50 backdrop-blur-sm bg-white/80">
    //     <ChatInterface 
    //       messages={messages}
    //       onSendMessage={addMessage}
    //     />
    //   </div>
    // </div>

  );
}