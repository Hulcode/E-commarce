import { NavLink, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag } from "lucide-react";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { Button } from "../components/ui/button";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import useCartStore from "../contexts/CartStore";
const Header = () => {
  const cartItems = useCartStore((state) => state.CartItems);

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const handleOrders = () => {
    navigate("/orders");
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    }
  };
  const links = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
  ];

  return (
    <div className="max-w-7xl border-b px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mx-auto h-20  flex items-center justify-between">
      {/* Logo */}
      <img
        src={Logo}
        alt="Forever"
        onClick={() => {
          navigate("/");
        }}
        className="w-34"
      />

      {/* Navigation */}
      <nav className="hidden md:flex items-center font-medium gap-6">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `text-sm tracking-widest transition ${
                isActive ? "text-black " : "text-gray-700 hover:text-black"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
        <button
          onClick={() => {
            window.open(import.meta.env.VITE_ADMIN_PANEL, "_blank");
          }}
          className="border rounded-full px-6 py-2 text-sm hover:bg-gray-100 transition"
        >
          Admin Panel
        </button>
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <Search
          size={24}
          onClick={() => {
            navigate("/collection");
          }}
          className="cursor-pointer hover:text-gray-500"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <User size={24} className="cursor-pointer hover:text-gray-500" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={handleOrders}>Orders</DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout} className="text-red-700">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          className="relative  cursor-pointer"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <ShoppingBag size={24} className="hover:text-gray-500" />

          <span className="absolute -bottom-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs">
            {itemCount}
          </span>
        </div>
        <Button
          variant="ghost"
          className="md:hidden w-10 h-10"
          onClick={() => setOpenNav((prev) => !prev)}
        >
          <AnimatePresence mode="wait">
            {openNav ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
      <AnimatePresence>
        {openNav && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-18 right-0 w-full h-screen bg-white md:hidden"
          >
            <nav className="flex flex-col gap-6 p-6">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpenNav(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 text-lg"
                      : "text-gray-700 hover:text-blue-600 text-lg"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  window.open(import.meta.env.VITE_ADMIN_PANEL, "_blank");
                }}
                className="border rounded-full px-6 py-2 text-sm hover:bg-gray-100 transition"
              >
                Admin Panel
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
