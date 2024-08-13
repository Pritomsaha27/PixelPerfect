import React from 'react';
import Navbar from './Navbar';
import HomeTab from './HomeTab';

function Home({ images, setSearch,query,setQuery,setPage,url }) {
  
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
        <p className='mt-6 mb-4  lg:text-3xl  font-semibold text-neutral-800'>{Tittle}</p>
        <div className="grid grid-cols-2 mt-2 gap-2 md:grid-cols-3">
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
      </div>x
    </>
  );
}

export default Home;
