import { Star, StarHalf } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useCartStore from "../contexts/CartStore";
const Product = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const fetchCart = useCartStore((state) => state.fetchCart);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(API_PATHS.PRODUCT.PRODUCT(id));

      if (!data.success) throw new Error(data.message);

      setProduct(data.product);
      console.log(data.product);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  const addToCard = async () => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.CART.ADD, {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],

        size: selectedSize,
      });

      if (!data.success) throw new Error(data.message);
      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 flex justify-center items-center bg-[#f0faf2]">
        Loading Products...
      </main>
    );
  }
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Product */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex gap-4 md:flex-row flex-col">
          <div className="gap-3 flex md:flex-col">
            {product.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                onClick={() => setSelectedImage(item)}
                className="w-24 border cursor-pointer"
              />
            ))}
          </div>

          <img
            src={selectedImage === null ? product.images[0] : selectedImage}
            alt={product.name}
            className="flex-1 border object-cover"
          />
        </div>
        {/* Details */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <Star size={15} fill="#ff5a36" color="#ff5a36" />
            <Star size={15} fill="#ff5a36" color="#ff5a36" />
            <Star size={15} fill="#ff5a36" color="#ff5a36" />
            <Star size={15} fill="#ff5a36" color="#ff5a36" />
            <StarHalf size={15} fill="#ff5a36" color="#ff5a36" />

            <span className="ml-2 text-lg">122</span>
          </div>

          <h2 className="text-3xl font-semibold mt-4">${product.price}</h2>

          <p className="text-gray-500 mt-4 leading-6 max-w-lg">
            {product.description}
          </p>

          <h3 className="mt-5 text-xl font-medium">Select Size</h3>

          <div className="flex gap-4 mt-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-10 border text-lg transition ${
                  selectedSize === size
                    ? "border-black bg-gray-100"
                    : "bg-gray-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              addToCard();
            }}
            className="mt-10 bg-black text-white px-9 py-3 hover:bg-gray-900 transition"
          >
            ADD TO CART
          </button>
        </div>{" "}
        <div className="border-t mt-3 pt-3 space-y-2 text-gray-600">
          <p>100% Original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy return and exchange policy within 7 days.</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-20">
        <div className="flex">
          <button className="border px-10 py-5 font-semibold">
            Description
          </button>

          <button className="border border-l-0 px-10 py-5">
            Reviews (122)
          </button>
        </div>

        <div className="border border-t-0 p-10 text-gray-600 leading-8">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence.
          </p>

          <br />

          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Product;
