// src/pages/Login.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuth";
import { Input } from "antd";


const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    loading,
    error,
    clearError,
  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
      e: React.SyntheticEvent
  ) => {
    e.preventDefault();

    try {
      clearError();

      await login({
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-400 mb-8">
          Login to continue streaming
        </p>

        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
      <div>
  <label className="block text-sm text-zinc-300 mb-2">
    Email
  </label>

  <Input
    size="large"
    type="email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
    placeholder="Enter your email"
    required
    style={{
      background: "#09090b",
      borderColor: "#3f3f46",
      color: "white",
    }}
  />
</div>

<div>
  <label className="block text-sm text-zinc-300 mb-2">
    Password
  </label>

  <Input.Password
    size="large"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
    placeholder="Enter your password"
    required
    style={{
      background: "#09090b",
      borderColor: "#3f3f46",
      color: "white",
    }}
  />
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;