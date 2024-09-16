import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useAuth0 } from '@auth0/auth0-react';
import ImageModal from "./ImageModal";
import { IoLogOut } from "react-icons/io5";
function PhotoGalleryById() {
  const [selectedPhotographer, setSelectedPhotographer] = useState('');
  const [selectedAltText, setSelectedAltText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [photos, setPhotos] = useState([]); 

  const { isAuthenticated, user,logout } = useAuth0();

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
          const res = await axios.get(`http://localhost:5000/api/get-liked-photos`, {
            params: { auth0Id: user.sub },
          });

          const photoPromises = res.data.likedPhotos.map(async (photoId) => {
            const response = await axios.get(`https://api.pexels.com/v1/photos/${photoId}`, {
              headers: { Authorization: "ZUmSFKgLX1vSTTJvZ1USdGMarZfkaeek8Ql99p9xXUkzVyt5U5bO62KJ" },
            });
            return response.data;
          });

          const likedPhotos = await Promise.all(photoPromises);
          setPhotos(likedPhotos);
        } catch (error) {
          console.error('Error fetching liked photos:', error);
        }
      };

      fetchLikedPhotos();
    }
  }, [isAuthenticated, user]);

  return (
    <>
     <div className='fixed z-40'>
    <Navbar />
    </div>
      {isAuthenticated && (
        <p className="mt-20 text-center text-neutral-600 font-bold text-2xl lg:text-4xl mb-8">Welcome, {user.name}</p>
      )}
      
       
      <div className="px-2 sm:px-6 md:px-10 lg:px-20 xl:px-40 z-0">
     <div className="flex justify-between">
     <p className='text-neutral-600  text-3xl font-bold'>Liked Photos</p> 
      <button className="text-4xl" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <IoLogOut />
    </button>
     </div>
        <div className="grid grid-cols-2 mt-2 gap-2 md:grid-cols-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative flex items-center justify-center bg-gray-200 cursor-pointer overflow-hidden">
              <img
                onClick={() => openModal(photo.src.large, photo.photographer, photo.alt)}
                className="object-cover h-full w-full"
                src={photo.src.large}
                alt={photo.alt}
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

export default PhotoGalleryById;
