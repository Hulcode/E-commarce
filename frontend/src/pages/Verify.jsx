import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import useCartStore from "../contexts/CartStore";

const Verify = () => {
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axiosInstance.post(
          API_PATHS.ORDER.VERIFY_STRIPE,
          {
            success,
            orderId,
          },
        );
        if (data.success) {
          clearCart();
          navigate("/orders");
        } else {
          navigate("/cart");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
        navigate("/cart");
      }
    };
    verifyPayment();
  }, []); // run once — no need to depend on anything

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      Verifying payment…
    </div>
  );
};

export default Verify;
