import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSendResetCodeMutation } from "../../Redux/api/usersApiSlice"; 
import { motion } from "framer-motion";

export default function PageForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [sendResetCode, { isLoading }] = useSendResetCodeMutation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendResetCode(email).unwrap();
      toast.success("A reset code has been sent to your email.");
      navigate("/verify-code");
    } catch (err) {
      toast.error(err?.data?.message || "Error sending the reset code.");
    }
  };

  return (
    <div className="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center h-screen">
          <ToastContainer />
          <form onSubmit={handleForgotPassword} className="p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full p-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Code"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
