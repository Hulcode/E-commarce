export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// utils/apiPaths.j
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/user/login/admin",

    LOGOUT: "/api/user/logout",
    ME: "/api/user/me",
  },

  ITEMS: {
    ADD: "/api/product/add",
    ITEMS: "/api/product/list",
    DELETE: (id) => `/api/product/remove/${id}`,
  },
  ORDERS: {
    ORDERS: "/api/order/list",
    CHANGE_STATUS: (id) => `/api/order/status/${id}`,
  },
};
