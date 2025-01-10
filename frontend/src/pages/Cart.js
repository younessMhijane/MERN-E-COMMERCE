import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCartItems } from "../Redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const clearCartHandler = () => {
    dispatch(clearCartItems());
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  return (
    <div className="container mx-auto p-4">
      {cartItems.length === 0 ? (
        <div className="flex row items-center justify-center text-center text-gray-500 h-screen">
          <div>
            <FaShoppingCart className="h-24 w-24" />
            <p>Your cart is empty!</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          </div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Qty: {item.qty}</p>
                </div>
                <div className="flex gap-2">
                  {/* Utilise le lien dynamique pour rediriger vers la page du produit */}
                  <Link
                    to={`/cart/${item._id}`} // L'ID du produit est utilisé dans l'URL
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Buy
                  </Link>
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-lg font-semibold">Total: ${calculateTotalPrice()}</h3>
            <button
              onClick={clearCartHandler}
              className="bg-red-500 text-white py-2 px-4 rounded"
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
