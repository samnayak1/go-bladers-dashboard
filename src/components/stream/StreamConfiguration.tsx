import { Card, Space, Divider, Button} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import CopyableField from "../common/CopyableField";



interface StreamConfigurationProps {
  rtmpUrl: string;
  streamKey: string;
  onRegenerateKey: () => void;
  onCopy?: (value: string) => void;
}

const StreamConfiguration: React.FC<StreamConfigurationProps> = ({
  rtmpUrl,
  streamKey,
  onRegenerateKey,
  onCopy,
}) => {
  return (
    <Card
      title={<span style={{ color: "white" }}>Stream Configuration</span>}
      style={{
        background: "#18181b",
        borderColor: "#27272a",
      }}
      extra={
        <Button danger icon={<ReloadOutlined />} onClick={onRegenerateKey}>
          Regenerate Key
        </Button>
      }
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <CopyableField label="RTMP URL" value={rtmpUrl} onCopy={onCopy} />
        
        <CopyableField
          label="Stream Key"
          value={streamKey}
          valueColor="text-green-400"
          onCopy={onCopy}
        />
      </Space>

      <Divider />
    </Card>
  );
};

export default StreamConfiguration;