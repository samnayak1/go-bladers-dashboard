import { useEffect } from "react";

import { message } from "antd";
import { useAuthStore } from "../hooks/useAuth";
import { useStreamStore } from "../hooks/useStream";
import PageHeader from "../components/common/PageHeader";
import UserCard from "../components/common/UserCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StreamConfiguration from "../components/stream/StreamConfiguration";
import OBSInstructions from "../components/stream/OBSInstructions";

const Dashboard = () => {

  const { user, fetchSessionUser, loading } = useAuthStore();
  const { streamKey, regenerateStreamKey } = useStreamStore();

  useEffect(() => {
    fetchSessionUser();
  }, [fetchSessionUser]);

  const displayedStreamKey = streamKey || user?.streamKey;
  const rtmpUrl = `${import.meta.env.VITE_OBS}`;

  const handleCopy = (_: string) => {
    message.success("Copied to clipboard");
  };

  const handleRegenerate = async () => {
    try {
      await regenerateStreamKey();
      message.success("Stream key regenerated");
    } catch (err) {
      console.error(err);
      message.error("Failed to regenerate stream key");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-5xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="Creator Dashboard"
          subtitle="Manage your live streaming setup"
        />

        <UserCard username={user?.username || ""} email={user?.email || ""} />

        <StreamConfiguration
          rtmpUrl={rtmpUrl}
          streamKey={displayedStreamKey || ""}
          onRegenerateKey={handleRegenerate}
          onCopy={handleCopy}
        />

        <OBSInstructions rtmpUrl={rtmpUrl} streamKey={displayedStreamKey || ""} />
      </div>
    </div>
  );
};

export default Dashboard;