import { Input } from "antd";

interface AuthFormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  isPassword?: boolean;
}

const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  isPassword = false,
}) => {
  const InputComponent = isPassword ? Input.Password : Input;

  return (
    <div>
      <label className="block text-sm text-zinc-300 mb-2">
        {label}
      </label>

      <InputComponent
        size="large"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          background: "#09090b",
          borderColor: "#3f3f46",
          color: "white",
        }}
      />
    </div>
  );
};

export default AuthFormInput;