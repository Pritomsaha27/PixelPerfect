import React, { useState, useEffect,useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from '../context/SearchContext'; 

function HomeTab() {
  const {query, setQuery } = useContext(SearchContext);
  const [activeButton, setActiveButton] = useState(null);
  const location = useLocation();
  const buttons = ["Cats", "Kolkata", "Portrait", "Retro", "Dogs"];

  useEffect(() => {
    const currentPath = location.pathname.substring(1);
    setActiveButton(
      buttons.find((button) => button.toLowerCase() === currentPath) || null
    );
    setQuery("");
  }, [location.pathname]);

  return (
    <div className="text-sm items-center lg:text-xl text-center justify-center mt-20 font-bold flex">
      {buttons.map((buttonText) => (
        <Link
          key={buttonText}
          to={`/${buttonText.toLowerCase()}`}
          onClick={() => setActiveButton(buttonText)}
          className={`rounded-3xl px-4 py-2 ${
            activeButton === buttonText ? "bg-black text-white" : "text-black "
          }`}
        >
          {buttonText}
        </Link>
      ))}
    </div>
  );
}

export default HomeTab;
