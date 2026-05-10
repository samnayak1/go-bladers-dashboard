import { Button } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  showDashboard?: boolean;
  showProfile?: boolean;
  className?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  showDashboard = true,
  showProfile = false,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex gap-3 mb-8 ${className}`}>
      {showDashboard && (
        <Button
          type="primary"
          icon={<DashboardOutlined />}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
      )}
      
      {showProfile && (
        <Button onClick={() => navigate("/profile")}>
          Profile
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;