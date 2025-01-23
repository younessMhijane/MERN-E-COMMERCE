import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../Redux/api/usersApiSlice";
import { setCredentials } from "../../Redux/features/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../asserts/logo.png";
import { motion } from "framer-motion";

export default function PageLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login successful!");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Invalid email or password.");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="bg-gray-50">
      <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <ToastContainer />
      <div className="w-full max-w-md space-y-6 bg-white shadow-lg rounded-lg p-6">
        {/* Logo and Heading */}
        <div className="text-center">
          <img src={logo} alt="LaReine" className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="text-sm flex gap-2">
                <Link
                  to="/forgot-password"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
                <span>or</span>
                <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
                  Create Account
                </Link>
              </div>
            </div>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-indigo-500 transition duration-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </motion.div>
    </div>
  );
}
