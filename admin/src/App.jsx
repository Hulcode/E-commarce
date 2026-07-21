import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import SideBar from "./layout/SideBar";
import Header from "./layout/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddItems from "./pages/AddItems";
import Login from "./pages/Login";
import ProtectedRoute from "./myComponents/ProtectedRoute";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";
import useAuthStore from "./contexts/AuthStore";
function App() {
  const getUser = useAuthStore((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex">
        <SideBar />

        <Routes>
          <Route
            path="/add-items"
            element={
              <ProtectedRoute>
                {" "}
                <AddItems />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route
            path="/list-items"
            element={
              <ProtectedRoute>
                {" "}
                <ListItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                {" "}
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}

export default App;
