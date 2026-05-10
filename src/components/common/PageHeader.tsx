import { Button, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface PageHeaderProps {
  title: string;
  subtitle: string;
  showHomeButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showHomeButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          {title}
        </Title>

        <Text style={{ color: "#a1a1aa" }}>{subtitle}</Text>
      </div>

      {showHomeButton && (
        <Button icon={<HomeOutlined />} onClick={() => navigate("/")}>
          Home
        </Button>
      )}
    </div>
  );
};

export default PageHeader;