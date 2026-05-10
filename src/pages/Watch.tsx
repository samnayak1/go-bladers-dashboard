import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Button, Select } from "antd";
import { 

  FullscreenOutlined,
  PictureOutlined 
} from "@ant-design/icons";
import VideoPlayer from "../components/common/VideoPlayer";
import StreamErrorBoundary from "../components/common/StreamErrorBoundary";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StreamContainer from "../components/stream/StreamContainer";
import StreamInfo from "../components/stream/StreamInfo";
import StreamUrlBuilder from "../utils/StreamBuilder";


const { Option } = Select;

const Watch = () => {
  const { username, streamId } = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<string>("auto");

  // Determine if it's a live stream or replay
  const isLive = !streamId;

  useEffect(() => {
    const url = StreamUrlBuilder.getStreamUrl({ username: username!, streamId });
    if (url) {
      setStreamUrl(url);
    } else {
      message.error("Invalid stream URL");
    }
  }, [username, streamId]);

  const handleVideoError = (error: any) => {
    console.error("Video error:", error);
    message.error("Failed to load stream. Please try again.");
  };

  const handleVideoLoad = () => {
    console.log("Stream loaded successfully");
  };

  const handleRefresh = () => {
    if (streamUrl) {
      setStreamUrl(null);
      setTimeout(() => {
        setStreamUrl(StreamUrlBuilder.getStreamUrl({ username: username!, streamId }));
      }, 100);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handlePictureInPicture = async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.error("PiP error:", error);
      }
    }
  };

  const handleQualityChange = (value: string) => {
    setQuality(value);
    // Here you would implement quality switching logic
    // For example, by loading a different HLS variant
    message.info(`Quality changed to ${value}`);
  };

  if (!streamUrl) {
    return <LoadingSpinner fullScreen text="Preparing stream..." />;
  }

  return (
    <StreamErrorBoundary>
      <StreamContainer>
        <StreamInfo
          username={username!}
          isLive={isLive}
          streamTitle={`${username}'s Stream`}
          viewerCount={isLive ? 42 : undefined}
          onRefresh={handleRefresh}
          onFullscreen={handleFullscreen}
        />
        
        <div className="relative mt-4">
          <VideoPlayer
            ref={videoRef}
            src={streamUrl}
            autoPlay={true}
            controls={true}
            className="w-full rounded-xl border border-zinc-800"
            onError={handleVideoError}
            onLoad={handleVideoLoad}
          />
          
          {/* Quality selector and controls overlay */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
            {/* Quality Selector */}
            <Select
              value={quality}
              onChange={handleQualityChange}
              size="small"
              style={{ width: 100 }}
              className="bg-black/80"
            >
              <Option value="auto">Auto</Option>
              <Option value="1080p">1080p</Option>
              <Option value="720p">720p</Option>
              <Option value="480p">480p</Option>
            </Select>

            <Button
              size="small"
              icon={<PictureOutlined />}
              onClick={handlePictureInPicture}
            >
              PiP
            </Button>
            
            <Button
              size="small"
              icon={<FullscreenOutlined />}
              onClick={handleFullscreen}
            >
              Fullscreen
            </Button>
          </div>
        </div>
      </StreamContainer>
    </StreamErrorBoundary>
  );
};

export default Watch;