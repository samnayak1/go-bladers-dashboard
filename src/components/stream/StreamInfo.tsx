import { Card, Typography, Space, Tag, Button } from "antd";
import { 
  UserOutlined, 

  FullscreenOutlined,
  ReloadOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface StreamInfoProps {
  username: string;
  isLive?: boolean;
  streamTitle?: string;
  viewerCount?: number;
  onFullscreen?: () => void;
  onRefresh?: () => void;
}

const StreamInfo: React.FC<StreamInfoProps> = ({
  username,
  isLive = false,
  streamTitle,
  viewerCount,
  onFullscreen,
  onRefresh,
}) => {
  return (
    <Card
      style={{
        background: "#18181b",
        borderColor: "#27272a",
        marginTop: 16,
      }}
    >
      <div className="flex flex-wrap justify-between items-center gap-4">
        <Space direction="vertical" size="small">
          <div className="flex items-center gap-2">
            <Title level={4} style={{ color: "white", margin: 0 }}>
              {streamTitle || `${username}'s Stream`}
            </Title>
            {isLive ? (
              <Tag color="red" className="animate-pulse">
                LIVE
              </Tag>
            ) : (
              <Tag color="blue">Replay</Tag>
            )}
          </div>

          <Space>
            <UserOutlined style={{ color: "#a1a1aa" }} />
            <Text style={{ color: "#a1a1aa" }}>@{username}</Text>
            
       
          </Space>
        </Space>

        <Space>
          {onRefresh && (
            <Button icon={<ReloadOutlined />} onClick={onRefresh}>
              Refresh
            </Button>
          )}
          {onFullscreen && (
            <Button icon={<FullscreenOutlined />} onClick={onFullscreen}>
              Fullscreen
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
};

export default StreamInfo;