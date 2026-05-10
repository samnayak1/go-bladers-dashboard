import { useEffect, useRef, forwardRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
  onError?: (error: any) => void;
  onLoad?: () => void;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ src, autoPlay = true, controls = true, className = "", onError, onLoad }, ref) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);
    const videoRef = (ref as React.RefObject<HTMLVideoElement>) || internalRef;

    useEffect(() => {
      if (!videoRef.current || !src) return;

      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
        });

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            video.play().catch((err) => {
              console.error("Auto-play failed:", err);
            });
          }
          onLoad?.();
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error("HLS error:", data);
          onError?.(data);
        });

        return () => {
          hls.destroy();
        };
      } 
      // Safari native HLS support
      else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;

        const handleLoadedMetadata = () => {
          if (autoPlay) {
            video.play().catch((err) => {
              console.error("Auto-play failed:", err);
            });
          }
          onLoad?.();
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
          video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
      }
    }, [src, autoPlay, onError, onLoad, videoRef]);

    return (
      <video
        ref={videoRef}
        controls={controls}
        autoPlay={autoPlay}
        className={className}
        playsInline
      />
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;