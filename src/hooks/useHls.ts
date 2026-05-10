import { useEffect, useRef } from "react";
import Hls from "hls.js";

export const useHls = (url: string | null) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!url || !videoRef.current) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) console.error("HLS fatal error:", data);
      });

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    }
  }, [url]);

  return videoRef;
};