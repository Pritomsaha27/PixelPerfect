import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Home from '../components/Home';

const API_KEY = "ZUmSFKgLX1vSTTJvZ1USdGMarZfkaeek8Ql99p9xXUkzVyt5U5bO62KJ";

function SearchPage({query,setQuery}) {
  const { searchTerm } = useParams();
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState(searchTerm || 'mumbai');

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${search}&per_page=80`, {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      setImages(res.data.photos);
    };

    if (search) {
      fetchImages();
    }
  }, [search]);

  return <Home  query={query} setQuery={setQuery} setSearch={setSearch} images={images} />;
}

export default SearchPage;
