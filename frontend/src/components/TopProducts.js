import React, { useState } from "react";
import { useTopProductsQuery } from "../Redux/api/productApiSlice";
import { FaCartPlus } from "react-icons/fa";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/features/cart/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [hoveredProduct, setHoveredProduct] = useState(null);

  const addToCartHandler = (product) => {
    if (!userInfo) {
      return toast.error("Please log in or create an account!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const { data: topProducts, isLoading, isError, error } = useTopProductsQuery();

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error?.data?.message || "Failed to load top products"}</p>;

  return (
    <div className="p-5 md:p-10">
      <ToastContainer />
      <div>
        <h2 className="text-2xl md:pb-5 font-semibold text-indigo-700 text-center mb-8">Top Products</h2>
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topProducts.map((product) => (
            <div
              key={product._id}
              className={`bg-white shadow-lg rounded-lg p-4 transform transition-transform duration-300 relative group ${
                hoveredProduct && hoveredProduct !== product._id
                  ? "grayscale opacity-70"
                  : "hover:scale-105"
              }`}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden rounded-md">
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full hover:cursor-pointer h-80 object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>
                <button
                  onClick={() => addToCartHandler(product)}
                  className="absolute top-2 right-2 bg-indigo-500 text-white p-2 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <FaCartPlus className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-lg font-semibold text-gray-800 truncate">
                    {product?.name}
                  </h5>
                  <p className="text-gray-500 text-xs">
                    {moment(product.createdAt).format("MMMM Do YYYY")}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {product?.description?.substring(0, 20)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-indigo-600 font-bold">
                    {product?.price?.toFixed(2) || "0.00"} DH
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
