import { useState } from "react";
import { Input } from "@/components/ui/input";
import UploadZone from "@/myComponents/UploadZone";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { API_PATHS } from "../../utils/paths";
import axiosInstance from "../../utils/axiosInstance";
const sizes = ["S", "M", "L", "XL", "XXL"];

const AddItems = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [resetKey, setResetKey] = useState(0);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState(0);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleImage = (index, file) => {
    const copy = [...images];
    copy[index] = file;
    setImages(copy);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    if (images.length < 2) {
      return toast.error("2 pictures is the minimum");
    }
    if (name === "" || description === "" || selectedSizes == []) {
      return toast.error("fill the rest of fields");
    }
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("subCategory", subCategory);
    data.append("price", price);
    data.append("sizes", JSON.stringify(selectedSizes));
    data.append("bestSeller", bestSeller);
    console.log(bestSeller);
    images.filter(Boolean).forEach((image) => {
      data.append("images", image);
    });
    try {
      setLoading(true);
      const { data: data2 } = await axiosInstance.post(
        API_PATHS.ITEMS.ADD,
        data,
      );

      toast.success(data2.message);

      setImages([null, null, null, null]);
      setResetKey((prev) => prev + 1);

      setName("");
      setDescription("");
      setCategory("Men");
      setSubCategory("Topwear");
      setPrice(0);
      selectedSizes.length === 0;
      setBestSeller(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 bg-[#f9fafb]">
      <div className="px-8 py-7">
        {/* Images */}
        <h3 className="font-medium mb-3">Upload Images</h3>

        <div className="flex flex-col md:flex-row items-center gap-3 mb-7">
          {images.map((_, index) => (
            <UploadZone
              key={`${resetKey}-${index}`}
              icon={ImagePlus}
              label="Upload"
              onFileSelect={(file) => handleImage(index, file)}
            />
          ))}
        </div>

        {/* Product Name */}
        <div className="mb-5 max-w-xl">
          <label className="font-medium mb-2 block">Product name</label>

          <Input
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-5 max-w-xl">
          <label className="font-medium mb-2 block">Product description</label>

          <textarea
            rows={4}
            className="w-full border rounded-md p-3"
            placeholder="Write content here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Selects */}
        <div className="flex gap-5 mb-6 flex-wrap">
          <div>
            <label className="block mb-2 font-medium">Product category</label>

            <select
              className="border rounded-md px-4 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Sub category</label>

            <select
              className="border rounded-md px-4 py-2"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Product Price</label>

            <Input
              type="number"
              className="w-36"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Product Sizes</h3>

          <div className="flex gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-5 py-2 rounded ${
                  selectedSizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2 mb-8">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
          />

          <span>Add to bestseller</span>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-10 py-3"
          disabled={loading}
        >
          {loading ? "ADDING..." : "ADD"}
        </button>
      </div>
    </main>
  );
};

export default AddItems;
