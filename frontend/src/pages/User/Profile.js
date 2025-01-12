import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useProfileMutation } from "../../Redux/api/usersApiSlice";
import { setCredentials } from "../../Redux/features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="p-6 pt-10 bg-gradient-to-r from-violet-300 via-violet-200 to-violet-100">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white text-center p-6">
          <FaUserCircle className="text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold">{username || "Your Name"}</h2>
          <p className="text-sm">{email || "Email not set"}</p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="p-6 space-y-6">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="block w-full rounded-md bg-gray-100 px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="block w-full rounded-md bg-gray-100 px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="block w-full rounded-md bg-gray-100 px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="block w-full rounded-md bg-gray-100 px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
              disabled={loadingUpdateProfile}
            >
              {loadingUpdateProfile ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="text-indigo-600 border border-indigo-600 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-100 transition duration-300"
              onClick={() => toast.info("Feature coming soon!")}
            >
              Change Avatar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
