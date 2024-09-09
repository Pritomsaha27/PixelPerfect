import React, { createContext, useState } from 'react';

// Create the context
export  const SearchContext = createContext();

// Provider component to wrap the part of the app where you need the search functionality
export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState(''); // Search input state
  const [searchTerm, setSearch] = useState(''); // Search term state
  const [page, setPage] = useState(1);
  return (
    <SearchContext.Provider value={{ query, setQuery, searchTerm, setSearch, page, setPage }}>
      {children}
    </SearchContext.Provider>
  );
};
