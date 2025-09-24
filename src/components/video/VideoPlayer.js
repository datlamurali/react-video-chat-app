import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Play, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoPlayer({ videoUrl, onVideoChange }) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";
      
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v');
      } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      }
      
      return videoId ? `https://www.youtube.com/embed/\${videoId}` : `https://www.youtube.com/embed/6pxRHBw-k8M`;
    } catch {
      return null;
    }
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  const handleUrlSubmit = () => {
    if (tempUrl.trim()) {
      onVideoChange(tempUrl);
      setShowUrlInput(false);
      setTempUrl("");
    }
  };

  return (
    <div className="relative h-full bg-slate-900 rounded-b-3xl overflow-hidden shadow-2xl">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title="YouTube video player"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="h-full flex items-center justify-center text-white">
          <div className="text-center">
            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-light">Enter a YouTube URL to start</p>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 flex gap-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {showUrlInput && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50"
        >
          <div className="flex gap-2">
            <Input
              placeholder="Paste YouTube URL here..."
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              className="flex-1 border-slate-200 focus:border-blue-400"
              onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
            />
            <Button
              onClick={handleUrlSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Load
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
