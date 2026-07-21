import { useState } from "react";
import ItemsDisplay from "../components/ItemsDisplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Search from "../components/Search";
const Collection = () => {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [sort, setSort] = useState("relevant");
  const [searchTerm, setSearchTrem] = useState("");
  const handleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((item) => item !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleType = (type) => {
    if (types.includes(type)) {
      setTypes(types.filter((item) => item !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 pb-10">
      <Search searchTerm={searchTerm} setSearchTrem={setSearchTrem} />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <aside className="w-full lg:w-64">
          <h2 className="text-xl font-medium mb-8">FILTERS</h2>

          <div className="border p-6 mb-8">
            <h3 className="font-semibold text-lg mb-5">CATEGORIES</h3>

            <div className="space-y-4">
              {["Men", "Women", "Kids"].map((item) => (
                <label key={item} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={categories.includes(item)}
                    onChange={() => handleCategory(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="border p-6">
            <h3 className="font-semibold text-lg mb-5">TYPE</h3>

            <div className="space-y-4">
              {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                <label key={item} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={types.includes(item)}
                    onChange={() => handleType(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-light">
              ALL <span className="font-semibold">COLLECTIONS</span>
              <span className="inline-block w-16 h-[2px] bg-gray-700 ml-3 align-middle"></span>
            </h2>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-56 h-14 rounded-none border-gray-300">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="relevant">Relevant</SelectItem>
                <SelectItem value="asc">Low to High</SelectItem>
                <SelectItem value="desc">High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ItemsDisplay
            header1=""
            header2=""
            isBestSeller={false}
            categories={categories}
            types={types}
            sort={sort}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </section>
  );
};

export default Collection;
