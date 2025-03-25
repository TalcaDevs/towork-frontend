import React, { useState } from 'react';
import { SearchInputProps } from '../types/types';
// Aseguramos que el componente se importe correctamente
// si los archivos están en la misma carpeta components
// ajusta la ruta según corresponda

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar...',
  onSearch,
  buttonText = 'Buscar',
}) => {
  const [query, setQuery] = useState('');
  
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
        className="flex-grow bg-transparent px-4 py-2 outline-none"
      />
      <button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors duration-200 flex items-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        {buttonText}
      </button>
    </form>
  );
};

export default SearchInput;