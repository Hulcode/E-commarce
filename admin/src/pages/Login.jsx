import { Input } from "@/components/ui/input";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/paths";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../contexts/AuthStore";
const Login = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test22");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const handleLogin = async () => {
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      if (!data.success) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Login success:");

      setUserInfo(data.userData);

      navigate("/add-items");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 h-[calc(100vh-60px)] bg-[#f0faf2] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white border border-[#c5e0c9] rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Login</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Email
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border-[#c5e0c9] focus:border-[#1DB954] focus:ring-[#1DB954]/20"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border-[#c5e0c9] focus:border-[#1DB954] focus:ring-[#1DB954]/20"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full px-6 py-3 bg-gray-900 text-white text-xs font-bold tracking-widest uppercase rounded-md
          hover:bg-[#1DB954] transition-colors active:scale-95"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </main>
  );
};

export default Login;
