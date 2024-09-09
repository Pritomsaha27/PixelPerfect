import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Home from "../components/Home";

const API_KEY = "ZUmSFKgLX1vSTTJvZ1USdGMarZfkaeek8Ql99p9xXUkzVyt5U5bO62KJ";

function SearchPage({ query, setQuery }) {
  const { searchTerm } = useParams();
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState(searchTerm || "mumbai");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0); 
  const location = useLocation();

  const clearImages = () => {
    setImages([]);
    setPage(1);
    setTotalResults(0); 
  };

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
      setPage(1);
      setImages([]);
      setTotalResults(0); 
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?page=${page}&query=${search}&per_page=80`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      setImages((prevImages) => [...prevImages, ...res.data.photos]);
      setTotalResults(res.data.total_results); 
     
      const photos = res.data.photos;
    };
    
    if (search) {
      fetchImages();
    }
  }, [search, page]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const currentHeight = window.scrollY + window.innerHeight;
      if (currentHeight >= totalHeight - 100) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setSearch("mumbai");
      clearImages();
    }
  }, [location.pathname]);

  return (
    <Home 
      url={location.pathname}
      query={query}
      setQuery={setQuery}
      setPage={setPage}
      setSearch={setSearch}
      images={images}
      totalResults={totalResults}

    />
  );
}

export default SearchPage;
