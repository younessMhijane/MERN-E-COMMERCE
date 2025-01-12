import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../Redux/api/usersApiSlice";
import { setCredentials } from "../../Redux/features/auth/authSlice";
import { toast,ToastContainer } from "react-toastify";
import logo from "../../asserts/logo.png";

export default function PageRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration successful!");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to register. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <ToastContainer/>
      <div className="w-full max-w-md space-y-6 bg-white shadow-lg rounded-lg p-6">
        {/* Logo and Heading */}
        <div className="text-center">
          <img src={logo} alt="LaReine" className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create an Account
          </h2>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="Enter your username"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Confirm your password"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-200"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to={`/login?redirect=${redirect}`}
            className="text-indigo-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
