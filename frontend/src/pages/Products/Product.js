// src/pages/Product.js
import React, { useEffect, useState } from "react";
import { useAllProductsQuery } from "../../Redux/api/productApiSlice";
import { FaCartPlus } from "react-icons/fa";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/features/cart/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Product = () => {
  
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query); // Récupérer la requête de recherche depuis Redux
  
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
  
  const { data: products, isLoading, isError, error } = useAllProductsQuery();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error?.data?.message || "Failed to load products"}</p>;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Recherche par nom
  );

  return (
    <div className="p-5 md:p-10">
      <ToastContainer />
      <h2 className="text-2xl md:pb-5 font-semibold text-indigo-700">All Products</h2>

      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div data-aos="fade-up">
            <div
              key={product._id}
              className={`bg-indigo-50 shadow-md rounded-lg p-4 transform transition-transform duration-300 relative group ${
                hoveredProduct && hoveredProduct !== product._id
                  ? "grayscale opacity-60"
                  : ""
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
                <div className="flex justify-between">
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
                    {product?.priceSale && product?.priceSale > 0 ? (
                      <>
                        <span className="text-red-500 line-through">{product?.price?.toFixed(2)} DH</span>
                        <span className="ml-2">{product?.priceSale?.toFixed(2)} DH</span>
                      </>
                    ) : (
                      `${product?.price?.toFixed(2)} DH`
                    )}
                  </span>
                </div>
              </div>
            </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center text-gray-600 text-lg font-medium space-x-2">
            <svg
              className="w-6 h-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804a9 9 0 1 1 13.758-13.758M12 7v5m0 0v5m0-5h5m-5 0H7"
              />
            </svg>
            <span>No products found</span>
          </p>

        )}
      </div>
    </div>
  );
};

export default Product;
