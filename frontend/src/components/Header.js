import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/actions/userActions'; // Utilisation de logoutUser action
import axios from '../axiosConfig';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout');
      dispatch(logoutUser()); 
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
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
        {userInfo ? (
          <>
            <span className="mr-4"> <b>{userInfo.username}</b></span>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-400">Logout</button>
          </>
        ) : (
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
