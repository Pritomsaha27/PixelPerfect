import React from 'react';
import Navbar from './Navbar';
import HomeTab from './HomeTab';

function Home({ images, setSearch }) {
  return (
    <>
      <Navbar setSearch={setSearch} />
      <HomeTab />
      <div className="px-2 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <div className="grid grid-cols-2 mt-10 gap-2 md:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="flex items-center justify-center bg-gray-200 overflow-hidden">
              <img
                className="object-cover h-full w-full"
                src={img.src.large}
                alt="gallery-photo"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
