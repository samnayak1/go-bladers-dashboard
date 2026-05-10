// src/pages/Dashboard.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Typography,
  Button,
  Space,

  Divider,
  Steps,
  message,
} from "antd";

import {
  CopyOutlined,
  ReloadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../hooks/useAuth";
import { useStreamStore } from "../hooks/useStream";



const { Title, Text, Paragraph } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    user,
    fetchSessionUser,
    loading,
  } = useAuthStore();

  const {
    streamKey,
    regenerateStreamKey,
  } = useStreamStore();

  useEffect(() => {
    fetchSessionUser();
  }, []);

  const displayedStreamKey =
    streamKey || user?.streamKey;

  const rtmpUrl =
    "rtmp://<url>:1935/stream";

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);

    message.success("Copied to clipboard");
  };

  const handleRegenerate = async () => {
    try {
      await regenerateStreamKey();

      message.success(
        "Stream key regenerated"
      );
    } catch (err) {
      console.error(err);

      message.error(
        "Failed to regenerate stream key"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title
              level={2}
              style={{ color: "white", margin: 0 }}
            >
              Creator Dashboard
            </Title>

            <Text style={{ color: "#a1a1aa" }}>
              Manage your live streaming setup
            </Text>
          </div>

          <Button
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>

        {/* USER CARD */}
        <Card
          className="mb-6"
          style={{
            background: "#18181b",
            borderColor: "#27272a",
          }}
        >
          <Space direction="vertical" size="small">
            <Title
              level={3}
              style={{ color: "white", margin: 0 }}
            >
              {user?.username}
            </Title>

            <Text style={{ color: "#a1a1aa" }}>
              {user?.email}
            </Text>
          </Space>
        </Card>

        {/* STREAM DETAILS */}
        <Card
          title={
            <span style={{ color: "white" }}>
              Stream Configuration
            </span>
          }
          style={{
            background: "#18181b",
            borderColor: "#27272a",
          }}
          extra={
            <Button
              danger
              icon={<ReloadOutlined />}
              onClick={handleRegenerate}
            >
              Regenerate Key
            </Button>
          }
        >
          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%" }}
          >
            {/* RTMP URL */}
            <div>
              <Text
                strong
                style={{ color: "white" }}
              >
                RTMP URL
              </Text>

              <div className="flex gap-2 mt-2">
                <div className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-blue-400">
                  {rtmpUrl}
                </div>

                <Button
                  icon={<CopyOutlined />}
                  onClick={() =>
                    handleCopy(rtmpUrl)
                  }
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* STREAM KEY */}
            <div>
              <Text
                strong
                style={{ color: "white" }}
              >
                Stream Key
              </Text>

              <div className="flex gap-2 mt-2">
                <div className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-green-400 break-all">
                  {displayedStreamKey}
                </div>

                <Button
                  icon={<CopyOutlined />}
                  onClick={() =>
                    handleCopy(
                      displayedStreamKey || ""
                    )
                  }
                >
                  Copy
                </Button>
              </div>
            </div>
          </Space>

          <Divider />

          {/* OBS INSTRUCTIONS */}
          <div>
            <Title
              level={4}
              style={{ color: "white" }}
            >
              OBS Setup Instructions
            </Title>

            <Paragraph
              style={{ color: "#a1a1aa" }}
            >
              Follow these steps to start
              streaming using OBS Studio.
            </Paragraph>

            <Steps
              direction="vertical"
              current={-1}
              items={[
                {
                  title: (
                    <span style={{ color: "white" }}>
                      Open OBS Studio
                    </span>
                  ),
                  description: (
                    <span style={{ color: "#d4d4d8" }}>
                      Launch OBS on your computer.
                    </span>
                  ),
                },
                {
                  title: (
                    <span style={{ color: "white" }}>
                      Go to Settings
                    </span>
                  ),
                  description: (
                    <span style={{ color: "#d4d4d8" }}>
                      Click the Settings button in the bottom-right corner.
                    </span>
                  ),
                },
                {
                  title: (
                    <span style={{ color: "white" }}>
                      Open Stream Tab
                    </span>
                  ),
                  description: (
                    <span style={{ color: "#d4d4d8" }}>
                      Navigate to the Stream section.
                    </span>
                  ),
                },
                {
                  title: (
                    <span style={{ color: "white" }}>
                      Enter RTMP URL
                    </span>
                  ),
                  description: (
                    <span style={{ color: "#60a5fa" }}>
                      {rtmpUrl}
                    </span>
                  ),
                },
                {
                  title: (
                    <span style={{ color: "white" }}>
                      Enter Stream Key
                    </span>
                  ),
                  description: (
                    <span
                      style={{
                        color: "#4ade80",
                        wordBreak: "break-all",
                      }}
                    >
                      {displayedStreamKey}
                    </span>
                  ),
                },
                {
                  title: (
                    <span style={{ color: "white" }}>
                      Click Start Streaming
                    </span>
                  ),
                  description: (
                    <span style={{ color: "#d4d4d8" }}>
                      Your stream should now appear live on the platform.
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </Card>

        {loading && (
          <Text
            style={{
              color: "#a1a1aa",
              marginTop: 16,
              display: "block",
            }}
          >
            Loading...
          </Text>
        )}
      </div>
    </div>
  );
};

export default Dashboard;