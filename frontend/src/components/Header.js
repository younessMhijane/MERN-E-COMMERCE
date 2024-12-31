import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../Redux/features/auth/authSlice";
import { useLogoutMutation } from "../Redux/api/usersApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaRegUser } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";

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
    <>
      {/* Navigation Desktop */}
      <header className="hidden md:flex justify-between items-center p-3 px-8 border-b border-gray-300">
        <div className="text-2xl font-bold hover:cursor-pointer">Logo</div>

        <nav className="flex gap-10">
          <Link to="/" className="text-black no-underline hover:font-bold hover:text-blue-500 transition-all duration-300">Home</Link>
          <Link to="/products" className="text-black no-underline hover:font-bold hover:text-blue-500 transition-all duration-300">Products</Link>
          <Link to="/cart" className="text-black no-underline hover:font-bold hover:text-blue-500 transition-all duration-300">Cart</Link>
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/dashboard" className="text-black no-underline hover:font-bold hover:text-blue-500 transition-all duration-300">Dashboard</Link>
          )}
        </nav>

        <div>
          <input
            type="text"
            placeholder="Search Product"
            className="p-1.5 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-4">
          {userInfo ? (
            <>
              <Link to="/profile" className="mr-4 flex gap-2">
              <FaRegUser className="h-5" />
              <b>{userInfo.username}</b></Link>
              <button onClick={logoutHandler} className=" text-red-500 hover:text-red-400 flex justify-center items-center gap-1">
                Logout
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round"></path>
                  <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-indigo-600 hover:text-indigo-400 ">Login</Link>
              <Link to="/register" className="text-indigo-600 hover:text-indigo-400 ">Register</Link>
            </>
          )}
        </div>
      </header>

      {/* Navigation Mobile */}
      <div className="md:hidden bg-gray-300">
        <header className="flex justify-between items-center p-3">
          <div className="text-2xl font-bold">Logo</div>
          <button className="text-black px-4" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </header>
        {menuOpen && (
          <div className="flex flex-col bg-gray-300 gap-4 p-4">
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-black no-underline  hover:font-bold hover:relative hover:left-1 transition-all duration-300">Home</Link>
              <Link to="/products" className="text-black no-underline hover:font-bold hover:relative hover:left-1 transition-all duration-300">Products</Link>
              <Link to="/cart" className="text-black no-underline hover:font-bold hover:relative hover:left-1 transition-all duration-300">Cart</Link>
              {userInfo && userInfo.isAdmin && (
                <Link to="/admin/dashboard" className="text-black no-underline hover:font-bold hover:relative hover:left-1 transition-all duration-300">Dashboard</Link>
              )}
            </nav>
            <div className="mt-4">
              {userInfo ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 text-black hover:font-bold hover:relative hover:left-1 transition-all duration-300">
                    <FaRegUser className="h-5" />
                    <b>{userInfo.username}</b>
                  </Link>
                  <button onClick={logoutHandler} 
                  className=" flex  text-red-500 hover:text-red-600 mt-2 hover:font-bold hover:relative hover:left-1 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ">
                  <path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round"></path>
                  <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="gap-1 flex text-indigo-600 hover:text-indigo-500 hover:font-bold hover:relative hover:left-1 transition-all duration-300">
                  <MdLogin className='h-6'/>Login
                  </Link>
                  <Link to="/register" className="gap-1 flex text-indigo-600 hover:text-indigo-500 hover:font-bold hover:relative hover:left-1 transition-all duration-300">
                  <IoCreateSharp className='h-6'/>Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
