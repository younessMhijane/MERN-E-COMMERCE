import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Order Confirmed!</h2>
          <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully. Thank you for shopping with us!</p>
          
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
