import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Home from '../components/Home';

const API_KEY = "ZUmSFKgLX1vSTTJvZ1USdGMarZfkaeek8Ql99p9xXUkzVyt5U5bO62KJ";

function SearchPage({ query, setQuery }) {
  const { searchTerm } = useParams();
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState(searchTerm || 'mumbai');
  const [page, setPage] = useState(1);
  const location = useLocation();

  const clearImages = () => {
    setImages([]);
    setPage(1);
  };

  // Update search term and reset page on searchTerm change
  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
      setPage(1); // Reset page to 1 when search term changes
      setImages([]); // Clear the current images
    }
  }, [searchTerm]);

  // Fetch images whenever search term or page changes
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
      setImages((prevImages) => [...prevImages, ...res.data.photos]); // Append new images to the existing array
    };

    if (search) {
      fetchImages();
    }
  }, [search, page]); // dependency array

  // Handle infinite scroll and update page number
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const currentHeight = window.scrollY + window.innerHeight;
      if (currentHeight >= totalHeight) {
        setPage((prevPage) => prevPage + 1); 
      }
      console.log(`Total Height: ${totalHeight}px, Current Scroll Position: ${currentHeight}px`);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Clear images when navigating to home page
  useEffect(() => {
    if (location.pathname === '/') {
      clearImages();
    }
  }, [location.pathname]);

  return <Home query={query} setQuery={setQuery} setPage={se} setSearch={setSearch} images={images} />;
}

export default SearchPage;
