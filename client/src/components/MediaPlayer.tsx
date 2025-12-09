import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlayerProps {
  type: "video" | "audio" | "image";
  src: string;
  thumbnailUrl?: string;
  title: string;
}

export function MediaPlayer({ type, src, thumbnailUrl, title }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (type === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (type === "audio" && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (type === "video" && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else if (type === "audio" && audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (type === "video" && videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (type === "image") {
    return (
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          data-testid="media-image"
        />
      </div>
    );
  }

  if (type === "audio") {
    return (
      <div className="relative rounded-lg overflow-hidden bg-muted">
        <div className="relative aspect-[16/9]">
          <img
            src={thumbnailUrl || "/placeholder-audio.jpg"}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white"
              onClick={togglePlay}
              data-testid="audio-play-button"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={toggleMute}
              data-testid="audio-mute-button"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <div className="flex-1 h-1 bg-white/30 rounded-full">
              <div className="h-full w-1/3 bg-accent-blue rounded-full" />
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={src} className="hidden" data-testid="audio-element" />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/9] rounded-lg overflow-hidden bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={thumbnailUrl}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        data-testid="video-element"
      />
      
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity",
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        )}
      >
        {!isPlaying && (
          <Button
            variant="outline"
            size="icon"
            className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white"
            onClick={togglePlay}
            data-testid="video-play-button"
          >
            <Play className="h-10 w-10 ml-1" />
          </Button>
        )}
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={togglePlay}
            data-testid="video-control-play"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={toggleMute}
            data-testid="video-mute-button"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer">
            <div className="h-full w-0 bg-accent-blue rounded-full" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={toggleFullscreen}
            data-testid="video-fullscreen-button"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
