import React, { useState } from "react";
import { SearchInputProps } from "../interfaces/searchInput.interface";
import SearchIcon from "../assets/icons/SearchIcon";

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Buscar...",
  onSearch,
  buttonText = "Buscar",
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-1.5 md:p-2 rounded-full shadow-md flex items-center transition-all duration-300 ${
        isFocused ? "ring-2 ring-blue-300 shadow-lg" : ""
      }`}
    >
      <div className="flex-grow flex items-center pl-2 md:pl-4">
        <SearchIcon />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-grow bg-transparent px-2 py-2 md:py-3 outline-none text-gray-700 w-full"
          aria-label={placeholder}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 md:px-6 py-2 md:py-3 rounded-full transition-colors duration-200 flex items-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default SearchInput;