import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../Redux/features/auth/authSlice";
import { useLogoutMutation } from "../Redux/api/usersApiSlice";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex justify-between items-center p-3 px-8 border-b border-gray-300">
      <div className="text-2xl font-bold hover:cursor-pointer">Logo</div>

      <nav className="flex gap-10">
        <Link to="/" className="text-black no-underline hover:text-green-500">Home</Link>
        <Link to="/products" className="text-black no-underline hover:text-green-500">Products</Link>
        <Link to="/cart" className="text-black no-underline hover:text-green-500">Cart</Link>
        {userInfo && userInfo.isAdmin && (
          <Link to="/dashboard" className="text-black no-underline hover:text-green-500">Dashboard</Link>
        )}
      </nav>

      <div>
        <input
          type="text"
          placeholder="Search"
          className="p-1.5 border border-gray-300 rounded"
        />
      </div>

      <div className="flex gap-4">
        {userInfo?(
          <>
            <span className="mr-4 "> <b>{userInfo.username}</b></span><br/>
            <button onClick={logoutHandler} 
              className="w-8 h-8 text-red-500 hover:text-red-400 flex justify-center items-center"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6"
              >
                <path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round"></path>
                <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>

          </>


        ):(
          <>
            <Link to="/login" className="mr-4 text-indigo-600 hover:text-indigo-400">Login</Link>
            <Link to="/register" className="text-indigo-600 hover:text-indigo-400">Register</Link>
          </>
        )}
   
    
      </div>

      <div className="text-lg font-bold">
        <Link to="/cart" className="text-black no-underline">Cart</Link>
      </div>
    </header>
  );
}
