import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-toastify";
const useCartStore = create((set) => ({
  CartItems: [],
  isLoading: false,

  clearCart: async () => {
    set({ CartItems: [] });

    try {
      await axiosInstance.delete(API_PATHS.CART.DELETE_ALL);
    } catch (err) {
      return toast.error(err.response?.data?.message || "Failed ");
    }
  },

  updateQuantity: async (id, value) => {
    const quantity = Number(value) || 1;
    set((state) => ({
      CartItems: state.CartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    }));
    try {
      await axiosInstance.post(API_PATHS.CART.UPDATE, { quantity, id });
    } catch (err) {
      return toast.error(err.response?.data?.message || "Failed ");
    }
  },
  removeItem: async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.CART.DELETE, {
        data: {
          id,
        },
      });
    } catch (err) {
      return toast.error(err.response?.data?.message || "Failed ");
    }
    set((state) => ({
      CartItems: state.CartItems.filter((item) => item.id !== id),
    }));
  },

  fetchCart: async () => {
    try {
      set({ isLoading: true });

      const { data } = await axiosInstance.get(API_PATHS.CART.GET);

      if (!data.success) throw new Error(data.message);

      const itemsArray = Object.entries(data.cartData || {}).map(
        ([id, item]) => ({
          id,
          ...item,
        }),
      );
      set({
        CartItems: itemsArray,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCartStore;
