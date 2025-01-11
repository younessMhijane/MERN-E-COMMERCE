import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from "../Redux/features/auth/authSlice";
import { useLogoutMutation } from "../Redux/api/usersApiSlice";
import { selectCartCount } from '../Redux/features/cart/cartSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";

import logo from '../asserts/logo.png'

export default function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
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
      <header className="md:pt-5 bg-gradient-to-r from-violet-500 via-violet-400 to-violet-300">
        
      <div className="hidden md:flex justify-between items-center px-8">
        <Link to='/' className="flex font-bold hover:cursor-pointer gap-2">
          <img src={logo} className='h-[60px] p-2 rounded-full ' alt='LaReine'/>
          <h1 className='m-auto font-tan-mon-cheri text-base text-violet-950'>La Reine</h1>
        </Link>

        <nav className="flex gap-10 text-white">
          <Link to="/" className=" no-underline hover:font-bold hover:text-violet-800 transition-all duration-300">Home</Link>
          <Link to="/products" className=" no-underline hover:font-bold hover:text-violet-800 transition-all duration-300">Products</Link>
          <Link to="/Contact" className=" no-underline hover:font-bold hover:text-violet-800 transition-all duration-300">Contact</Link>
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/dashboard" className=" no-underline hover:font-bold hover:text-violet-800 transition-all duration-300">Dashboard</Link>
          )}
        </nav>

        <div>
          <input
            type="text"
            placeholder="Search Product"
            className="p-1 text-center border border-gray-300 rounded-full bg-violet-200"
          />
        </div>
        {userInfo && (
      <Link
        to="/cart"
        className="relative text-white hover:text-yellow-300 transition-all duration-300"
        aria-label="Go to Cart"
      >
        <div className="relative">
          <FaShoppingCart className="h-7 w-7 text-indigo-800" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

      </Link>
    )}
        <div className="flex gap-4">
          {userInfo ? (
            <>
        <Link to="/profile" className="mr-4">
            <div className="max-w-5 opacity-1 hover:max-w-xs hover:opacity-100 transition-all duration-300">
              <div className="flex gap-2 overflow-hidden">
                <div className="w-5 h-5">
                  <FaRegUser className="h-5" />
                </div>

                  <b>{userInfo.username}</b>
              </div>
            </div>
        </Link>


        <button onClick={logoutHandler} className=" text-red-500 hover:text-red-400">
          <div className="max-w-5 opacity-1 hover:max-w-xs hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2 overflow-hidden">
              <div className='w-6 h-6'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round"></path>
                        <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <p>Logout</p> 
            </div>
          </div>
        </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-indigo-800 font-bold hover:text-indigo-400 ">Login</Link>
              <Link to="/register" className="text-indigo-800 font-bold hover:text-indigo-400 ">Register</Link>
            </>
          )}
        </div>
      </div>
      </header>

{/* Navigation Mobile */}
<div className="md:hidden  bg-gradient-to-r from-violet-500 via-violet-400 to-violet-300">
<header className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-500 shadow-md">
  {/* Logo Section */}
  <Link to='/' className="flex items-center font-bold hover:cursor-pointer gap-3">
    <img
      src={logo}
      className="h-[40px] w-[40px] rounded-full border-2 border-white"
      alt="La Reine Logo"
    />
    <h1 className="text-white font-tan-mon-cheri text-xl tracking-wider">
      La Reine
    </h1>
  </Link>
  <div className='flex gap-2'>
  {/* Shopping Cart Icon */}
  {userInfo && (
    <Link
      to="/cart"
      className="relative flex items-center text-white no-underline hover:text-yellow-300 transition-all duration-300"
      aria-label="Go to Cart"
    >
      <div className="relative">
        <FaShoppingCart className="h-7 w-7 text-indigo-800" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </Link>
  )}

  {/* Menu Button */}
  <button
    className="hover:rotate-90 text-white px-4 transform transition-transform duration-300 hover:scale-110 focus:outline-none"
    onClick={toggleMenu}
    aria-label="Toggle Menu"
  >
    <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
  </button>
  </div>
</header>

  
  {/* Menu Mobile */}
  <div
    className={`flex flex-col bg-white/10 gap-4 overflow-hidden transition-all duration-300 ease-in-out ${
      menuOpen ? 'max-h-screen opacity-100 scale-100 p-4' : 'max-h-0 opacity-0 scale-95'}`
    }
    onMouseLeave={toggleMenu}
  >
    <nav className="flex flex-col gap-2">
      <Link
        to="/"
        className="text-black hover:text-violet-900 no-underline hover:font-bold hover:relative hover:left-1 transition-all duration-300 ease-in-out"
      >
        Home
      </Link>
      <Link
        to="/products"
        className="text-black hover:text-violet-900 no-underline hover:font-bold hover:relative hover:left-1 transition-all duration-300 ease-in-out"
      >
        Products
      </Link>
      <Link
        to="/Contact"
        className="text-black hover:text-violet-900 no-underline hover:font-bold hover:relative hover:left-1 transition-all duration-300 ease-in-out"
      >
        Contact
      </Link>

      {userInfo && userInfo.isAdmin && (
        <Link
          to="/admin/dashboard"
          className="text-black hover:text-violet-800 no-underline hover:font-bold hover:relative hover:left-1 transition-all duration-300 ease-in-out"
        >
          Dashboard
        </Link>
      )}
    </nav>
    <div className="mt-4">
      {userInfo ? (
        <>
          <Link
            to="/profile"
            className="flex items-center gap-2 text-black hover:font-bold hover:relative hover:left-1 transition-all duration-300 ease-in-out"
          >
            <FaRegUser className="h-5" />
            <b>{userInfo.username}</b>
          </Link>
          <button
            onClick={logoutHandler}
            className="flex text-red-500 hover:text-red-600 mt-2 hover:font-bold hover:relative hover:left-1 transition-all duration-300 ease-in-out"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4"
                stroke="#ff0000"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M10 12H20M20 12L17 9M20 12L17 15"
                stroke="#ff0000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="gap-1 flex text-indigo-600 hover:text-indigo-500 hover:font-bold hover:relative hover:left-1 transition-all duration-300 ease-in-out"
          >
            <MdLogin className="h-6" />Login
          </Link>
          <Link
            to="/register"
            className="gap-1 flex text-indigo-600 hover:text-indigo-500 hover:font-bold hover:relative hover:left-1 transition-all duration-300 ease-in-out"
          >
            <IoCreateSharp className="h-6" />Register
          </Link>
        </>
      )}
    </div>
  </div>
</div>

    </>
  );
}
