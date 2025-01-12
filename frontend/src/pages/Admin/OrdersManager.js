import React, { useEffect, useState } from "react";
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "../../Redux/api/orderApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
const OrdersManager = () => {
  const { data: orders, isLoading, isError, error } = useGetOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {
    if (orders) {
      const initialStatuses = {};
      orders.forEach((order) => {
        initialStatuses[order._id] = order.status;
      });
      setSelectedStatuses(initialStatuses);
    }
  }, [orders]);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses({ ...selectedStatuses, [orderId]: newStatus });
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      await updateOrderStatus({
        orderId,
        status: selectedStatuses[orderId],
      }).unwrap();
      toast.success("Order status updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(`Error updating status: ${err.message || "Unknown error"}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
  
  

  if (isLoading) return <Loading/>;
  if (isError) return <div>Error loading orders: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 overflow-y-auto">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Orders Dashboard</h2>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">Customer Name</th>
            <th className="border border-gray-300 p-2">Shipping Address</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order,i) => (
            <tr key={order._id} className="text-center">
              <td className="border border-gray-300 p-2 cursor-pointe">
                {order.orderItems.map((item) => (
                <div key={order._id}>
                  <Link
                    to={`/products/${item.product}`}
                    className="font-bold "
                  >
                    {i}
                  </Link>
                </div>
                ))}                
              </td>
                      <td className="border border-gray-300 p-2">{order.user?.username || "Unknown"}</td>
              <td className="border border-gray-300 p-2">
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.phone}
              </td>
              <td className="border border-gray-300 p-2">${order.totalPrice.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={selectedStatuses[order._id]}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleUpdateStatus(order._id)}
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersManager;
