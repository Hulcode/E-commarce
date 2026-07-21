import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

      navigate("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async () => {
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");
    if (!name.trim()) return toast.error("Name is required");

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        email,
        password,
        name,
      });

      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success("REGISTER success:");

      navigate("/");
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      console.error("REGISTER error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 my-20">
      <div className="w-full max-w-lg">
        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <h1 className="text-3xl font-light font-serif">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          <span className="w-16 h-[2px] bg-gray-700"></span>
        </div>

        <form className="space-y-4">
          {!isLogin && (
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              type="text"
              placeholder="Name"
              className="w-full border px-5 py-4 outline-none"
            />
          )}

          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full border px-5 py-4 outline-none"
          />

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="w-full border px-5 py-4 outline-none"
          />

          <div className="flex justify-between text-sm">
            <button type="button" className="hover:underline">
              Forgot your password?
            </button>

            <button
              type="button"
              className="hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create account" : "Login Here"}
            </button>
          </div>

          <div className="flex justify-center pt-4">
            <button
              disabled={loading}
              onClick={() => {
                isLogin ? handleLogin() : handleSignup();
              }}
              type="submit"
              className="bg-black text-white px-14 py-4 hover:bg-gray-900 transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
