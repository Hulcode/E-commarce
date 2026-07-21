export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// utils/apiPaths.j
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/user/login",
    LOGOUT: "/api/user/logout",
    REGISTER: "/api/user/signup",
  },

  PRODUCT: {
    PRODUCTS: "/api/product/list",
    SEARCH: "/api/product/search",
    PRODUCT: (id) => `/api/product/single/${id}`,
  },
  CART: {
    GET: "/api/cart/get",
    ADD: "/api/cart/add",
    UPDATE: "/api/cart/update",
    DELETE: "/api/cart/delete",
    DELETE_ALL: "/api/cart/delete-all",
  },
  ORDER: {
    MY: "/api/order/my",
    ADD: "/api/order/place",
    ADD_STRIPE: "/api/order/place_stripe",
    VERIFY_STRIPE: "/api/order/verifyStripe",
  },
};
