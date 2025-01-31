import React, { useEffect, useState, useMemo } from "react";
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
      toast.error(`Error updating status: ${err.message || "Unknown error"}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const groupedOrders = useMemo(() => {
    if (!orders) return { Pending: [], Completed: [], Cancelled: [] };
    return orders.reduce(
      (acc, order) => {
        acc[order.status]?.push(order);
        return acc;
      },
      { Pending: [], Completed: [], Cancelled: [] }
    );
  }, [orders]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading orders: {error.message}</div>;

  const renderOrdersTable = (orders, status) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{status} Orders</h3>
      {orders.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">Customer Name</th>
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Shipping Address</th>
              <th className="border border-gray-300 p-2">Total Price</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id} className="text-center">
                <td className="border border-gray-300 p-2">{order._id}</td>
                <td className="border border-gray-300 p-2">{order.user?.username || "Unknown"}</td>
                <td className="border border-gray-300">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex justify-center bg-violet-50">
                      <Link to={`/products/${item.product}`}>
                        <img 
                          src={item.image} 
                          alt={item.name || ""}
                          className="h-20" 
                        />
                      </Link>
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.shippingAddress.address},<br />
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode},<br />
                  {order.shippingAddress.phone}
                </td>
                <td className="border border-gray-300 p-2">{order.totalPrice.toFixed(2)} DH</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={selectedStatuses[order._id]}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
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
      ) : (
        <p>No {status.toLowerCase()} orders.</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4 overflow-y-auto">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Orders Dashboard</h2>
      {renderOrdersTable(groupedOrders.Pending, "Pending")}
      {renderOrdersTable(groupedOrders.Completed, "Completed")}
      {renderOrdersTable(groupedOrders.Cancelled, "Cancelled")}
    </div>
  );
};

export default OrdersManager;
