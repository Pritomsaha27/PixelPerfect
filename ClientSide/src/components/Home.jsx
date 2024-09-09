import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HomeTab from './HomeTab';
import ImageModal from '../components/ImageModal';
import { FaHeart } from "react-icons/fa"; // Import the love icon
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function Home({ images, setSearch, query, setQuery, setPage, url, totalResults }) { 
  const [selectedPhotographer, setSelectedPhotographer] = useState('');
  const [selectedAltText, setSelectedAltText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState([]); // State to store liked photos

  const { isAuthenticated, user } = useAuth0();

  const openModal = (imageSrc, photographerName, altText) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
    setSelectedPhotographer(photographerName);
    setSelectedAltText(altText);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setSelectedPhotographer('');
    setSelectedAltText('');
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchLikedPhotos = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/get-liked-photos', {
            params: { auth0Id: user.sub },
          });
          setLikedPhotos(res.data.likedPhotos || []);
        } catch (error) {
          console.error('Error fetching liked photos:', error);
        }
      };

      fetchLikedPhotos();
    }
  }, [isAuthenticated, user]);

  const toggleLike = async (photoId) => {
    try {
      const alreadyLiked = likedPhotos.includes(photoId);
      if (alreadyLiked) {
        setLikedPhotos(likedPhotos.filter((id) => id !== photoId));
        // Optional: You could add an API call to remove the photo from the user's liked list in the database
      } else {
        setLikedPhotos([...likedPhotos, photoId]);
        await axios.post('http://localhost:5000/api/save-liked-photo', {
          photoId,
          userId: user.sub,
        });
      }
    } catch (error) {
      console.error('Error saving liked photo:', error);
    }
  };

  function formatUrl(url) {
    if (!url || url === '/') return "Free Stock Photos";
    const formattedUrl = url.startsWith('/') ? "Images Of " + url.slice(1) : url;
    return formattedUrl;
  }

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const Tittle = capitalizeWords(formatUrl(url));

  return (
    <>
    <div className='fixed z-40'>
    <Navbar query={query} setQuery={setQuery} setPage={setPage} setSearch={setSearch} />
    </div>
      <HomeTab setQuery={setQuery} />
      <div className="px-2 sm:px-6 md:px-10 lg:px-20 xl:px-40 mt-20 z-0"> {/* Add mt-20 for spacing from navbar */}
        <p className='mt-4 lg:text-3xl text-2xl font-semibold text-neutral-800'>{Tittle}</p>
        <p className='mt-2 text-neutral-600 lg:text-base text-sm font-bold'>Total Results: {totalResults}</p> 
        <div className="grid grid-cols-2 mt-2 gap-2 md:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="relative flex items-center justify-center bg-gray-200 cursor-pointer overflow-hidden">
              <img
                onClick={() => openModal(img.src.large, img.photographer, img.alt)}
                className="object-cover h-full w-full"
                src={img.src.large}
                alt="gallery-photo"
              />
              <FaHeart
                className={`absolute bottom-2 right-2 text-2xl cursor-pointer ${
                  likedPhotos.includes(img.id) ? 'text-red-600' : 'text-white'
                }`}
                onClick={() => toggleLike(img.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={selectedImage}
        photographerName={selectedPhotographer}
        altText={selectedAltText}
      />
    </>
  );
}

export default Home;
