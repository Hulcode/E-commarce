import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/paths";
import { toast } from "react-toastify";
import { Package } from "lucide-react";

const statusOptions = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(API_PATHS.ORDERS.ORDERS);

      if (!data.success) throw new Error(data.message);

      setOrders(data.orders);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.ORDERS.CHANGE_STATUS(id),
        { status },
      );

      if (!data.success) throw new Error(data.message);

      toast.success("Status Updated");

      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status } : order)),
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <main className="flex-1 flex justify-center items-center bg-[#f0faf2]">
        Loading Orders...
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#f0faf2] overflow-y-auto px-18 py-7">
      <h2 className="text-xl font-semibold mb-2">Order Page</h2>

      <div className="space-y-2">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_0.1fr] gap-2 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 bg-[#f7f9fa]"
          >
            {/* Icon */}
            <div>
              <div className="w-16 h-16 border rounded flex justify-center items-center">
                <Package size={34} className="text-gray-500" />
              </div>
            </div>

            {/* Address + Products */}
            <div className="space-y-3">
              <div>
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.product.name} x {item.quantity} {item.size}
                  </p>
                ))}
              </div>

              <div>
                <p className="font-semibold">{order.address.name}</p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <p>Items : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="font-semibold text-lg">${order.amount}</p>
            </div>

            {/* Status */}
            <div className="flex justify-end items-start">
              <select
                value={order.status}
                onChange={(e) => changeStatus(order._id, e.target.value)}
                className="border rounded px-3 py-2 bg-white"
              >
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Orders;
