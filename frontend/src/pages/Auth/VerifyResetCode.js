import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useVerifyResetCodeMutation } from "../../Redux/api/usersApiSlice"; 
import { setCredentials } from "../../Redux/features/auth/authSlice"; 
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

export default function PageVerifyResetCode() {
  const [code, setCode] = useState(""); 
  const [email, setEmail] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyResetCode, { isLoading }] = useVerifyResetCodeMutation(); 

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyResetCode({ code,email }).unwrap(); 

      dispatch(setCredentials(res));

      toast.success("Code verified successfully! Logging you in.");
      navigate("/profile");
    } catch (err) {
      toast.error(err?.data?.message || "Incorrect code.");
    }
  };

  return (
    <div className="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center h-screen">
          <ToastContainer />
          <form onSubmit={handleVerifyCode} className="p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Verify Your Code</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Confirme Your email"
              required
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the code you received"
              required
              className="w-full p-2 border rounded mb-4"
            />
            
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
