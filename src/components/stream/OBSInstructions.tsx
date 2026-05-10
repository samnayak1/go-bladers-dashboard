import { Typography, Steps } from "antd";

const { Title, Paragraph } = Typography;

interface OBSInstructionsProps {
  rtmpUrl: string;
  streamKey: string;
}

const OBSInstructions: React.FC<OBSInstructionsProps> = ({
  rtmpUrl,
  streamKey,
}) => {
  return (
    <div>
      <Title level={4} style={{ color: "white" }}>
        OBS Setup Instructions
      </Title>

      <Paragraph style={{ color: "#a1a1aa" }}>
        Follow these steps to start streaming using OBS Studio.
      </Paragraph>

      <Steps
        direction="vertical"
        current={-1}
        items={[
          {
            title: <span style={{ color: "white" }}>Open OBS Studio</span>,
            description: (
              <span style={{ color: "#d4d4d8" }}>
                Launch OBS on your computer.
              </span>
            ),
          },
          {
            title: <span style={{ color: "white" }}>Go to Settings</span>,
            description: (
              <span style={{ color: "#d4d4d8" }}>
                Click the Settings button in the bottom-right corner.
              </span>
            ),
          },
          {
            title: <span style={{ color: "white" }}>Open Stream Tab</span>,
            description: (
              <span style={{ color: "#d4d4d8" }}>
                Navigate to the Stream section.
              </span>
            ),
          },
          {
            title: <span style={{ color: "white" }}>Enter RTMP URL</span>,
            description: <span style={{ color: "#60a5fa" }}>{rtmpUrl}</span>,
          },
          {
            title: <span style={{ color: "white" }}>Enter Stream Key</span>,
            description: (
              <span
                style={{
                  color: "#4ade80",
                  wordBreak: "break-all",
                }}
              >
                {streamKey}
              </span>
            ),
          },
          {
            title: <span style={{ color: "white" }}>Click Start Streaming</span>,
            description: (
              <span style={{ color: "#d4d4d8" }}>
                Your stream should now appear live on the platform.
              </span>
            ),
          },
        ]}
      />
    </div>
  );
};

export default OBSInstructions;