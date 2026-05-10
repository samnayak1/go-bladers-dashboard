import { Avatar, Typography} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface ProfileHeaderProps {
  username: string;
  email?: string;
  avatarUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  email,
  avatarUrl,
}) => {
  return (
    <div className="bg-linear-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 mb-8">
      <div className="flex flex-wrap gap-6 items-center">
        <Avatar
          size={100}
          src={avatarUrl}
          icon={<UserOutlined />}
          className="border-4 border-zinc-700"
        />

        <div>
          <Title level={2} style={{ color: "white", margin: 0 }}>
            {username}
          </Title>
          
          {email && (
            <Text style={{ color: "#a1a1aa" }}>
              {email}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;