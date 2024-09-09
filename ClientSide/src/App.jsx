import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PhotoGalleryById from './components/PhotoGalleryById';
import { SearchProvider } from './context/SearchContext';
import RequireAuth from './middleware/RequireAuth';
import { Auth0Provider } from '@auth0/auth0-react';


function App() {
  return (
    <Auth0Provider
    domain="dev-33pk1j33awynd4dd.us.auth0.com"
    clientId="i7GnMhFPwV3SMSKlnnlJEWZOJANY0ZXs"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/:searchTerm" element={<SearchPage />} />
          <Route path="/photos-by-id" element={<RequireAuth> <PhotoGalleryById /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
    </Auth0Provider>
  );
}

export default App;
