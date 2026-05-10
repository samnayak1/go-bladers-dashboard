import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";

const Watch = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { username, streamId } = useParams();

  useEffect(() => {
    if (!videoRef.current || !username) return;

    const video = videoRef.current;

    // LIVE STREAM
    let streamUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/stream/${username}/index.m3u8`;

    // REPLAY STREAM
    if (streamId) {
      streamUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/stream/replay/${username}/${streamId}/index.m3u8`;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error("HLS error:", data);
      });

      return () => {
        hls.destroy();
      };
    }

    // Safari native HLS support
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;

      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }
  }, [username, streamId]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full max-w-5xl rounded-xl border border-zinc-800"
      />
    </div>
  );
};

export default Watch;