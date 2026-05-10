import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition flex items-center gap-2 ${className}`}
    >
      <ArrowLeftOutlined />
      Back
    </button>
  );
};

export default BackButton;