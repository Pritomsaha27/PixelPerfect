import React, { useState } from 'react';
import Navbar from './Navbar';
import HomeTab from './HomeTab';
import ImageModal from '../components/ImageModal';


function Home({ images, setSearch, query, setQuery, setPage, url, totalResults }) { 
  const [selectedPhotographer, setSelectedPhotographer] = useState('');
  const [selectedAltText, setSelectedAltText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc ,photographerName, altText) => {
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
      <Navbar query={query} setQuery={setQuery} setPage={setPage} setSearch={setSearch} />
      <HomeTab setQuery={setQuery} />
      <div className="px-2 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <p className='mt-4 lg:text-3xl text-2xl font-semibold text-neutral-800'>{Tittle}</p>
        <p className='mt-2 text-neutral-600 lg:text-base text-sm font-bold'>Total Results: {totalResults}</p> 
        <div className="grid grid-cols-2 mt-2 gap-2 md:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="flex items-center justify-center bg-gray-200  cursor-pointer overflow-hidden"
            onClick={() => openModal(img.src.large, img.photographer, img.alt)}>
              <img
                className="object-cover h-full w-full"
                src={img.src.large}
                alt="gallery-photo"
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
