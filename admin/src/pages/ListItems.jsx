import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/paths";

const ListItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.post(API_PATHS.ITEMS.ITEMS, {
        subCategory: "",
        category: "",
        order: "relevant",
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      setProducts(data.products);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosInstance.delete(API_PATHS.ITEMS.DELETE(id));

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Product deleted");

      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <main className="flex-1 bg-[#f0faf2] flex items-center justify-center">
        <p className="text-gray-600">Loading Products...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#f0faf2] overflow-hidden">
      <div className="px-8 py-7">
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <h2 className="px-6 py-5 text-lg font-semibold">All Products List</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f8fbf9] border-y">
                  <th className="table-head-item">Image</th>
                  <th className="table-head-item">Name</th>
                  <th className="table-head-item">Category</th>
                  <th className="table-head-item">Price</th>
                  <th className="table-head-item">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-[#f8fbf9] transition"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-14 h-14 rounded object-cover border"
                        />
                      </td>

                      <td className="px-6 py-4 font-medium">{product.name}</td>

                      <td className="px-6 py-4">{product.category}</td>

                      <td className="px-6 py-4">${product.price}</td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ListItems;
