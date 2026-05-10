import { useState } from "react";
import AuthFormInput from "./AuthFormInput";
import AuthSubmitButton from "./AuthSubmitButton";


interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthFormInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
        required
      />

      <AuthFormInput
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
        required
        isPassword
      />

      <AuthSubmitButton
        loading={loading}
        text="Login"
        loadingText="Logging in..."
      />
    </form>
  );
};

export default LoginForm;