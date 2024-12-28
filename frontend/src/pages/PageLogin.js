import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/actions/userActions';

export default function PageLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sélectionner les informations utilisateur et les erreurs du store Redux
  const { userInfo, error, loading } = useSelector((state) => state.userLogin || {});

  // Gérer la connexion
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate('/dashboard');
    } else if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);
  

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm flex gap-2">
                  <a href="/#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                  or
                  <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Create Account ?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading} // Désactiver le bouton si la connexion est en cours
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            {error && (
              <p className="flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
