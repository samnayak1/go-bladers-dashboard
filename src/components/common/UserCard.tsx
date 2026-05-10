import { Card, Typography, Space } from "antd";

const { Title, Text } = Typography;

interface UserCardProps {
  username: string;
  email: string;
}

const UserCard: React.FC<UserCardProps> = ({ username, email }) => {
  return (
    <Card
      className="mb-6"
      style={{
        background: "#18181b",
        borderColor: "#27272a",
      }}
    >
      <Space direction="vertical" size="small">
        <Title level={3} style={{ color: "white", margin: 0 }}>
          {username}
        </Title>

        <Text style={{ color: "#a1a1aa" }}>{email}</Text>
      </Space>
    </Card>
  );
};

export default UserCard;