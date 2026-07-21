import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-toastify";
import ItemCard from "./ItemCard";

const ItemsDisplay = ({
  header1,
  header2,
  isBestSeller,
  count = 100,
  categories,
  types,
  sort,
  searchTerm,
}) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.PRODUCT.PRODUCTS, {
        subCategory: types,
        category: categories,
        order: sort,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      setProducts(data.products);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products");
      setProducts([]);
    }
  };

  const fetchSearchProducts = async () => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.PRODUCT.SEARCH, {
        search: searchTerm,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      setProducts(data.products);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products");
      setProducts([]);
    }
  };
  useEffect(() => {
    searchTerm === "" || searchTerm === undefined
      ? fetchProducts()
      : fetchSearchProducts();
  }, [categories, searchTerm, types, sort]);

  const displayProducts = isBestSeller
    ? products.filter((item) => item.bestSeller)
    : products;

  return (
    <section className="max-w-7xl mx-auto  px-4 ">
      {(header1 || header2) && (
        <div className="text-center my-15">
          <h2 className="text-4xl font-light tracking-wide text-slate-600">
            {header1}{" "}
            <span className="font-semibold text-black">{header2}</span>
            <span className="inline-block w-14 h-[2px] bg-gray-800 ml-3 align-middle"></span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      )}

      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 `}>
        {displayProducts.slice(0, count).map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ItemsDisplay;
