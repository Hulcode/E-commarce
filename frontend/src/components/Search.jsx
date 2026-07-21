import React from "react";
import { Input } from "../components/ui/input";
import { Search as SearchIcon, X } from "lucide-react";

const Search = ({ searchTerm, setSearchTrem }) => {
  return (
    <div className="w-full bg-gray-100 py-8 mb-10">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-4 px-4">
        <div className="relative flex-1">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTrem(e.target.value)}
            placeholder="Search"
            className="h-10 rounded-full pl-6 pr-14 text-lg bg-white border-gray-300"
          />

          <SearchIcon
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>

        <button
          onClick={() => {
            setSearchTrem("");
          }}
        >
          <X size={20} className="text-gray-600 hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default Search;
