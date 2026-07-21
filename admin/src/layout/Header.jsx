import Logo from "../assets/logo.png";
import { Button } from "../components/ui/button";
import { API_PATHS } from "../../utils/paths";
import axiosInstance from "../../utils/axiosInstance";

import { toast } from "react-toastify";

const Header = () => {
  async function logoutHandler() {
    try {
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products");
    }
  }
  return (
    <div className="bg-[#f9fafb] w-full px-8 md:px-20 flex justify-between items-center py-3 border-b">
      <img src={Logo} alt="" className="h-12" />
      <Button onClick={() => logoutHandler()}>Logout</Button>
    </div>
  );
};

export default Header;
