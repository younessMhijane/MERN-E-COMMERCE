import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../Redux/api/orderApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderConfirmation from "./OrderConfirmation";

const CartItem = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const product = cartItems.find((item) => item._id === productId);
  const [quantity, setQuantity] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isConfirm, setIsConfirm] = useState(false);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!product) navigate("/cart");
  }, [product, navigate]);

  const validateShippingInfo = () => {
    const newErrors = {};
    const { address, city, postalCode, phone } = shippingInfo;

    if (!address.trim()) newErrors.address = "Address is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!postalCode.trim() || !/^\d{5}$/.test(postalCode)) {
      newErrors.postalCode = "Postal code must be 5 digits.";
    }
    if (!phone.trim() || !/^\+?\d{10,15}$/.test(phone)) {
      newErrors.phone = "Phone number must be valid (10-15 digits).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Validation success if no errors
  };

  const handleConfirmOrder = async () => {
    if (!validateShippingInfo()) return;

    const orderData = {
      orderItems: [
        {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.priceSale || product.price,
          qty: quantity,
        },
      ],
      shippingAddress: shippingInfo,
      totalPrice: (product.priceSale || product.price) * quantity,
    };
    console.log(orderData);
    try {
      await createOrder(orderData).unwrap();
      toast.success("Order successfully created!");
      setIsConfirm(true);
    } catch (err) {
      toast.error(`Error creating order: ${err.message || "Unknown error"}`);
    }
  };

  const handleInputChange = (e, field) => {
    setShippingInfo({ ...shippingInfo, [field]: e.target.value });
    setErrors({ ...errors, [field]: undefined }); // Clear error for the field being edited
  };

  return (
    <>
      <ToastContainer />
      {isConfirm ? (
        <OrderConfirmation />
      ) : (
        <div className="p-6 sm:p-4 md:px-10 lg:px-20 xl:px-36 bg-gradient-to-r from-violet-300 via-violet-200 to-violet-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Product</h2>
          <div className="flex justify-between bg-violet-50 items-center shadow-md rounded-lg p-4 mb-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
              <p className="text-gray-600">Price: {product.priceSale || product.price} DH</p>
              <div className="flex items-center gap-2 mt-2">
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

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h3>
          <form>
            {["address", "city", "postalCode", "phone"].map((field) => (
              <div className="mb-6" key={field}>
                <label className="block text-gray-700 capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={shippingInfo[field]}
                  onChange={(e) => handleInputChange(e, field)}
                  className={`w-full p-3 border ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  } bg-violet-50 rounded-lg focus:ring-2 ${
                    errors[field] ? "focus:ring-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder={`Enter your ${field}`}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-2">{errors[field]}</p>}
              </div>
            ))}
          </form>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
          <p className="text-gray-600">Total Price: {(product.priceSale || product.price) * quantity} DH</p>

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
      )}
    </>
  );
};

export default CartItem;
