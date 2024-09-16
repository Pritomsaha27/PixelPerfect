import React, { createContext, useState } from 'react';
export  const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState(''); 
  const [searchTerm, setSearch] = useState(''); 
  const [page, setPage] = useState(1);
  return (
    <SearchContext.Provider value={{ query, setQuery, searchTerm, setSearch, page, setPage }}>
      {children}
    </SearchContext.Provider>
  );
};
