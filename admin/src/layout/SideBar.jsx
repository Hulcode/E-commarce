import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  XIcon,
  HamburgerIcon,
  PlusCircleIcon,
  LucideFileChartColumnIncreasing,
  Box,
} from "lucide-react";

const SideBar = () => {
  const [showNav, setShowNav] = useState(false);

  const navItems = [
    {
      title: "Add Items",
      path: "/add-items",
      icon: PlusCircleIcon,
    },
    {
      title: "List Items",
      path: "/list-items",
      icon: LucideFileChartColumnIncreasing,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: Box,
    },
  ];

  return (
    <>
      <Button
        onClick={() => setShowNav(!showNav)}
        className="md:hidden fixed top-8 left-4 z-50  p-2 rounded"
      >
        {showNav ? <XIcon /> : <HamburgerIcon />}
      </Button>

      <div
        className={`${showNav ? "flex" : "hidden"}    md:flex flex-col w-62 h-screen border-r bg-[#f9fafb]`}
      >
        <div className="flex flex-col gap-3 items-end  p-7 pr-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 w-56 px-3 py-2 rounded transition-colors ${
                    isActive
                      ? "bg-[#ffebf5] text-pink-600 border-r-4 border-pink-500"
                      : "bg-[#f7f9fa] hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
