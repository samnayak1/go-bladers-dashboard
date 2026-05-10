import { Typography } from "antd";

const { Title } = Typography;

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  className = "",
}) => {
  return (
    <Title level={3} style={{ color: "white", marginBottom: 16 }} className={className}>
      {title}
    </Title>
  );
};

export default SectionTitle;