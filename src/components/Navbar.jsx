import React, { useState } from 'react';
import logo from "../assets/logo1.png"

function Navbar({ setSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action
      setSearch(inputValue);
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      setSearch(inputValue);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 xl:px-16">
        <img className='w-12' src={logo} alt="" />
        <div className="w-full py-1 max-w-md mx-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Search..."
            className="w-full py-2 px-4 border rounded-md focus:outline-none"
          />
        </div>
        <div className="text-md sm:text-sm md:text-md font-medium">
          Categories
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
