import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../Redux/api/orderApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importer les styles de react-toastify

const SingleProductOrder = () => {
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
      navigate("/order-confirmation");
    } catch (err) {
      toast.error(`Error creating order: ${err.message || "Unknown error"}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Toast Container */}
      <ToastContainer />

      {/* Affichage des détails du produit */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Order Product</h2>
      </div>
      <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex-1 ml-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">Price: ${product.price}</p>
          <div className="flex items-center gap-2">
            <label>Qty:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-1 rounded"
            />
          </div>
        </div>
      </div>

      {/* Formulaire pour les informations de livraison */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
        <form>
          <div className="mb-4">
            <label className="block">Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">City</label>
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your city"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleShippingChange}
              className="w-full p-2 border rounded"
              placeholder="Enter postal code"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Phone</label>
            <input
              type="text"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </form>
      </div>

      {/* Résumé de la commande */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <p className="text-gray-600">Total Price: ${totalPrice.toFixed(2)}</p>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/cart")}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Back to Cart
        </button>
        <button
          onClick={handleConfirmOrder}
          className="bg-indigo-500 text-white py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default SingleProductOrder;
