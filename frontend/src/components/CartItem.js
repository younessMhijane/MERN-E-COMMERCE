import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../Redux/api/orderApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderConfirmation from './OrderConfirmation'
const CartItem = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const product = cartItems.find((item) => item._id === productId);

  const [quantity, setQuantity] = useState(1);
  const [isConfirm, setIsConfirm] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!product) {
      navigate("/cart");
    }
  }, [product, navigate]);

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const totalPrice = product ? product.price * quantity : 0;

  const handleConfirmOrder = async () => {
    const orderData = {
      orderItems: [
        {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty: quantity,
        },
      ],
      shippingAddress: shippingInfo,
      totalPrice,
    };

    try {
      await createOrder(orderData).unwrap();
      toast.success("Order successfully created!", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsConfirm(true)
      
    } catch (err) {
      toast.error(`Error creating order: ${err.message || "Unknown error"}`, {
        position: "top-right",
        autoClose: 5000,
      });
      setIsConfirm(false)
      
    }
  };

  if (!product) return <div>Product not found.</div>;

  return (<>

    {isConfirm ?
      <OrderConfirmation/>
      :
         <div className=" p-6 sm:p-4 md:px-10 lg:px-20 xl:px-36 bg-gradient-to-r from-violet-300 via-violet-200 to-violet-100">
      {/* Toast Container */}
      <ToastContainer />

      {/* Product Details */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Order Product</h2>
      </div>
      <div className="flex justify-between bg-violet-50 items-center bg-white shadow-md rounded-lg p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="flex-1 ml-4">
          <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
          <p className="text-gray-600">Price: {product.price} DH</p>
          <div className="flex items-center gap-2">
            <label className="text-gray-700">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border bg-gray-50 p-2 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Shipping Information Form */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h3>
        <form>
          <div className="mb-6">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              className="w-full p-3 border bg-violet-50 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              className="w-full p-3 border bg-violet-50 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your city"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleShippingChange}
              className="w-full p-3 border bg-violet-50 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter postal code"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingChange}
              className="w-full p-3 border bg-violet-50 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
        <p className="text-gray-600">Total Price: {totalPrice.toFixed(2)} DH</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 mt-8">
        <button
          onClick={() => navigate("/cart")}
          className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
        >
          Back to Cart
        </button>
        <button
          onClick={handleConfirmOrder}
          className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
    }
  </>);
};

export default CartItem;
