import React, { useState } from "react";
import { SearchInputProps } from "../interfaces/searchInput.interface";
import SearchIcon from "../assets/icons/SearchIcon";

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Buscar...",
  onSearch,
  buttonText = "Buscar",
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 rounded-full shadow-md flex items-center"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-grow bg-transparent px-4 py-3 outline-none"
      />
      <button
        type="submit"
        className="bg-blue-300 hover:bg-blue-400 text-black px-6 py-3 rounded-full transition-colors duration-200 flex items-center cursor-pointer"
      >
        <SearchIcon />
        {buttonText}
      </button>
    </form>
  );
};

export default SearchInput;
