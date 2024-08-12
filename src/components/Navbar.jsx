import React, { useState } from 'react';
import logo from "../assets/logo1.png";
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";

function Navbar({ setSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(); 
    }
  };

  const handleSearch = (event) => {
    if (event) event.preventDefault();
    if (query.trim()) {
      const formattedQuery = query.toLowerCase().replace(/\s+/g, '-');
      setSearch(formattedQuery); 
      navigate(`/${formattedQuery}`);
      setQuery(""); 
    }
  };

  const handleLogoClick = () => {
    setSearch(''); 
    navigate('/'); 
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 xl:px-16">
        <div onClick={handleLogoClick} className="cursor-pointer">
          <img className='w-12' src={logo} alt="Logo" />
        </div>

        <form className="relative w-full text-xs my-2 max-w-md mx-4" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search From Over 3.2M+ Photos"
            className="w-full py-2 bg-gray-100 h-8 px-4 rounded-md focus:outline-none pr-10"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer">
            <FaMagnifyingGlass className="text-gray-500 hover:text-black" />
          </button>
        </form>

        <div className="text-md sm:text-sm md:text-md font-medium">
          Categories
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
