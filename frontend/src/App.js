import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/PageHome';
import Products from './pages/PageProduct';
import Cart from './pages/PagePanier';
import Dashboard from './pages/AdminDashboard';
import Login from './pages/PageLogin';
import Register from './pages/PageRegister';
import NotFound from './pages/PageNotFound'
import { useSelector } from 'react-redux';
function App() {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        {userInfo && userInfo.isAdmin && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
