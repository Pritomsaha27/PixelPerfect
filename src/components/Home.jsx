import React from 'react';
import Navbar from './Navbar';

function Home({ images, setSearch }) {
  return (
    <>
    <Navbar setSearch={setSearch}/>
      <div>
        <div className="grid grid-cols-2 mt-14 gap-2 md:grid-cols-3 lg:px-20">
          {images.map((img) => (
            <div key={img.id} className="flex items-center justify-center   bg-gray-200  overflow-hidden">
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
