import React from 'react';
import { FaDownload } from "react-icons/fa6";
function ImageModal({ isOpen, onClose, imageSrc, photographerName, altText }) {
  if (!isOpen) return null;
// Function to handle the download
const handleDownload = async () => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${altText || 'image'}.jpg`; // Set the filename using the alt text or default to 'image'
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the object URL
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative bg-white rounded-lg w-full max-w-screen-2xl   p-6 ">
        <div className="flex justify-between items-center mb-4">
          <p className=" text-gray-600 text-base font-bold md:text-xl"> Captured by : {photographerName}</p>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            <FaDownload />
          </button>
        </div>
        
        <div className="flex justify-center  pb-4">
          <img
            src={imageSrc}
            alt={altText}
            className=" object-contain "
          />
        </div>
        <div>
          <p className=" text-gray-600 text-sm text-center font-semibold md:text-lg"> {altText}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute -top-5 -left-2 m-4 text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default ImageModal;
