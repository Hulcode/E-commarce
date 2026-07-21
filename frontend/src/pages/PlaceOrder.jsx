import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import useCartStore from "../contexts/CartStore";

const DELIVERY_FEE = 10;

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const CartItems = useCartStore((state) => state.CartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = CartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const total = subtotal + DELIVERY_FEE;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async () => {
    if (Object.values(formData).some((v) => v.trim() === "")) {
      toast.error("Please fill in all delivery details");
      return;
    }
    if (CartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = { CartItems, address: formData, amount: total };

    try {
      if (paymentMethod === "stripe") {
        const { data } = await axiosInstance.post(
          API_PATHS.ORDER.ADD_STRIPE,
          orderData,
        );
        if (data.success) {
          window.location.replace(data.session_url);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axiosInstance.post(API_PATHS.ORDER.ADD, {
          ...orderData,
          status: "Order Placed",
          paid: false,
          paymentMethod: "COD",
        });
        if (data.success) {
          clearCart();
          toast.success("Order placed");
          navigate("/orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">
      <div className="grid lg:grid-cols-2 gap-14">
        <div>
          <h2 className="text-4xl text-gray-600 font-light uppercase mb-8">
            Delivery Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
                className="input"
                placeholder="First Name"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
                className="input"
                placeholder="Last Name"
              />
            </div>
            <input
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              className="input w-full"
              placeholder="Email"
            />
            <input
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              className="input w-full"
              placeholder="Street"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                className="input"
                placeholder="City"
              />
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                className="input"
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
                className="input"
                placeholder="Zip Code"
              />
              <input
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                className="input"
                placeholder="Country"
              />
            </div>
            <input
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              className="input w-full"
              placeholder="Phone"
            />
          </div>
        </div>

        <div>
          <h2 className="text-4xl text-gray-600 font-light uppercase mb-8">
            Cart Totals
          </h2>
          <div className="space-y-3 border-b pb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <h3 className="text-2xl text-gray-600 uppercase mt-10 mb-5">
            Payment Method
          </h3>
          <div className="grid gap-4">
            <label
              className={`border p-5 flex items-center gap-3 cursor-pointer ${paymentMethod === "stripe" ? "border-black" : ""}`}
            >
              <input
                type="radio"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              <span className="font-semibold text-violet-600 text-xl">
                Stripe
              </span>
            </label>
            <label
              className={`border p-5 flex items-center gap-3 cursor-pointer ${paymentMethod === "cod" ? "border-black" : ""}`}
            >
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span className="font-semibold text-gray-700">
                CASH ON DELIVERY
              </span>
            </label>
          </div>

          <button
            onClick={placeOrder}
            className="mt-10 w-full bg-black text-white py-4 uppercase tracking-wider hover:bg-gray-900 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
};

export default PlaceOrder;
