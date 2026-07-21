import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../contexts/CartStore";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.CartItems);
  const loading = useCartStore((state) => state.isLoading);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const shipping = 10;

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  console.log(cartItems);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const total = subtotal + shipping;

  if (loading) {
    return (
      <main className="flex-1 flex justify-center items-center bg-[#f0faf2]">
        Loading product...
      </main>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl text-gray-500 font-light mb-6">
        YOUR <span className="font-semibold text-black">CART</span>
        <span className="inline-block w-16 h-[2px] bg-gray-700 ml-3 align-middle"></span>
      </h1>

      <div className="divide-y border-t">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[80px_1fr_120px_60px] gap-6 items-center py-6"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-24 object-cover"
            />

            <div>
              <h3 className="font-medium">{item.product.name}</h3>

              <div className="flex items-center gap-5 mt-3">
                <span>${item.product.price}</span>

                <span className="border px-4 py-1">{item.size}</span>
              </div>
            </div>

            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
              className="border w-20 px-3 py-2 outline-none"
            />

            <Trash2
              className="cursor-pointer hover:text-red-500"
              onClick={() => removeItem(item.id)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-20">
        <div className="w-full max-w-md">
          <h2 className="text-2xl text-gray-500 font-light mb-8">
            CART <span className="font-semibold">TOTALS</span>
            <span className="inline-block w-16 h-[2px] bg-gray-700 ml-3 align-middle"></span>
          </h2>

          <div className="space-y-4 border-b pb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-y py-4">
              <span>Shipping Fee</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/place-order")}
            className="mt-8 bg-black text-white px-10 py-4 w-full hover:bg-gray-900 transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
