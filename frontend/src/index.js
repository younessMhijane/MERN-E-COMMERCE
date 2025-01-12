import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";


import Home from "./pages/PageHome";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound.js";
import Login from "./pages/Auth/PageLogin.js";
import Register from "./pages/Auth/PageRegister.js";

import Profile from "./pages/User/Profile.js";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";
import OrderList from "./pages/Admin/OrdersManager.js";

import AllProducts from "./pages/Admin/AllProducts";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";

import Product from "./pages/Products/Product.js";
import ProductCart from "./components/ProductCard";
import Cart from "./pages/User/Cart.js";
import CartItem from "./components/CartItem.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/products" element={<Product />} />
      <Route path="/products/:id" element={<ProductCart />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cart/:id" element={<CartItem />} />
      
      <Route path="/admin" element={<AdminRoute />} >
        <Route path="userlist" element={<UserList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="allproductslist/CreateProduct" element={<CreateProduct />} />
        <Route path="allproductslist/update/:_id" element={<UpdateProduct />} />
        <Route path="orderlist" element={<OrderList />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);