import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(API_PATHS.ORDER.MY);

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

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        Loading Orders...
      </main>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-10 py-10">
      <h1 className="text-2xl font-light border-b pb-3">
        MY <span className="font-semibold">ORDERS</span>
        <span className="inline-block w-16 h-[2px] bg-gray-700 ml-3 align-middle"></span>
      </h1>

      <div className="mt-8">
        {orders.map((order) =>
          order.items.map((item, index) => (
            <div
              key={`${order._id}-${index}`}
              className="grid grid-cols-1 md:grid-cols-[90px_2fr_1fr_180px] gap-6 items-center border-b py-6"
            >
              {/* Product Image */}
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover border"
              />

              {/* Product Information */}
              <div>
                <h2 className="text-lg font-medium">{item.product.name}</h2>

                <div className="flex flex-wrap gap-4 mt-2 text-gray-700">
                  <span>${item.product.price}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Size: {item.size}</span>
                </div>

                <p className="mt-2 text-gray-500">
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <p className="text-gray-500">Payment: {order.paymentMethod}</p>
              </div>

              {/* Order Status */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span>{order.status}</span>
              </div>

              {/* Track Button */}
              <div className="md:text-right">
                <button className="border px-6 py-2 rounded hover:bg-gray-100 transition">
                  Track Order
                </button>
              </div>
            </div>
          )),
        )}
      </div>
    </section>
  );
};

export default Orders;
