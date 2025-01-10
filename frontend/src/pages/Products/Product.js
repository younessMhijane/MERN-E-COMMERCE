import React from "react";
import { useAllProductsQuery } from "../../Redux/api/productApiSlice";
import { FaCartPlus } from "react-icons/fa";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Product = () => {
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Récupérer tous les produits via RTK Query
  const { data: products, isLoading, isError, error } = useAllProductsQuery();

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error?.data?.message || "Failed to load products"}</p>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-indigo-600 font-bold">${product.price}</span>
            <button
              onClick={() => addToCartHandler(product)}
              className="flex items-center gap-2 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
            >
              <FaCartPlus className="h-5 w-5" />
              Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
