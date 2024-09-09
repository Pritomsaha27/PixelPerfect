import logo from "../assets/logo1.png";
import React, { useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { SearchContext } from '../context/SearchContext'; // Import the context
function Navbar() {
  const { setSearch, query, setQuery, setPage } = useContext(SearchContext); // Access the search state from the context

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
      document.activeElement.blur();
    }
  };

  const handleLogoClick = () => {
    
    setSearch("mumbai"); 
    setQuery(""); 
    setPage(1)
    navigate(`/`); 
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4">
        <div onClick={handleLogoClick} className="cursor-pointer">
          <img className='w-16' src={logo} alt="Logo" />
        </div>

        <form className="relative w-full text-xs lg:text-base  my-2 max-w-md mx-4" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search From Over 3.2M+ Photos"
            className="w-full  bg-gray-100 h-10 px-4 rounded-md  pr-10"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer">
            <FaMagnifyingGlass className="text-gray-500 hover:text-black" />
          </button>
        </form>

        <div className="text-3xl">
        <Link to={"/photos-by-id"}><FaUserCircle /></Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
