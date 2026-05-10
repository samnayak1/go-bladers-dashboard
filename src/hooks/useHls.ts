import { useState, useCallback } from "react";
import Hls from "hls.js";

interface UseStreamPlayerOptions {
  onError?: (error: any) => void;
  onLoad?: () => void;
}

export const useStreamPlayer = (options?: UseStreamPlayerOptions) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);

  const initializeHls = useCallback((
    video: HTMLVideoElement,
    src: string
  ) => {
    setIsLoading(true);
    setError(null);

    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        options?.onLoad?.();
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        const errorMsg = `HLS Error: ${data.type} - ${data.details}`;
        setError(errorMsg);
        options?.onError?.(data);
        setIsLoading(false);
      });

      setHlsInstance(hls);
      return hls;
    } 
    // Safari native HLS
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      
      const handleLoadedMetadata = () => {
        setIsLoading(false);
        options?.onLoad?.();
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      
      // Cleanup function for Safari
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
    else {
      setError("HLS is not supported in this browser");
      setIsLoading(false);
      return null;
    }
  }, [options]);

  const destroyHls = useCallback(() => {
    if (hlsInstance) {
      hlsInstance.destroy();
      setHlsInstance(null);
    }
  }, [hlsInstance]);

  return {
    isLoading,
    error,
    initializeHls,
    destroyHls,
    hlsInstance,
  };
};