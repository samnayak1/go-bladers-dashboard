import { Button, Typography, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface CopyableFieldProps {
  label: string;
  value: string;
  valueColor?: string;
  onCopy?: (value: string) => void;
}

const CopyableField: React.FC<CopyableFieldProps> = ({
  label,
  value,
  valueColor = "text-blue-400",
  onCopy,
}) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    message.success("Copied to clipboard");
    onCopy?.(value);
  };

  return (
    <div>
      <Text strong style={{ color: "white" }}>
        {label}
      </Text>

      <div className="flex gap-2 mt-2">
        <div className={`flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 ${valueColor} break-all`}>
          {value}
        </div>

        <Button icon={<CopyOutlined />} onClick={handleCopy}>
          Copy
        </Button>
      </div>
    </div>
  );
};

export default CopyableField;