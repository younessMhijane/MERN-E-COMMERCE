import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCartItems } from "../../Redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAllProductsQuery } from "../../Redux/api/productApiSlice";
import Loading from "../../components/Loading";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const { data: products = [], isLoading, isError } = useAllProductsQuery();

  // Remove cart items not in the product list
  useEffect(() => {
    if (!isLoading && !isError) {
      const availableProductIds = new Set(products.map((product) => product._id));
      cartItems.forEach((item) => {
        if (!availableProductIds.has(item._id)) {
          dispatch(removeFromCart(item._id));
        }
      });
    }
  }, [products, cartItems, isLoading, isError, dispatch]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const clearCartHandler = () => {
    dispatch(clearCartItems());
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + (item.priceSale || item.price) * item.qty, 0);
  };

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <p>Error loading products. Please try again later.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 h-screen">
          <FaShoppingCart className="h-24 w-24 text-indigo-400" />
          <p className="text-lg font-semibold mt-4">Your cart is empty!</p>
          <Link
            to="/products"
            className="mt-6 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-all"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-indigo-700">Shopping Cart</h2>
          </div>
          <div data-aos="fade-down" className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 border border-indigo-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">
                    Price: 
                    <span className="font-medium text-indigo-600">
                      {item?.priceSale && item?.priceSale > 0 ? (
                        <>
                          <span className="ml-1 text-red-500 line-through">{item?.price?.toFixed(2)} DH</span>
                          <span className="ml-2">{item?.priceSale?.toFixed(2)} DH</span>
                        </>
                      ) : (
                        `${item?.price?.toFixed(2)} DH`
                      )}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Quantity: <span className="font-medium">{item.qty}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/cart/${item._id}`}
                    className="bg-indigo-500 text-white py-1 px-3 rounded hover:bg-indigo-600 transition-all"
                  >
                    Buy
                  </Link>
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div data-aos="fade-down" className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-indigo-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-indigo-700">
              Total: <span className="text-indigo-800">{calculateTotalPrice()} DH</span>
            </h3>
            <button
              onClick={clearCartHandler}
              className="mt-4 sm:mt-0 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
