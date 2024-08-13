import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState(''); 

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/:searchTerm" element={<SearchPage query={query} setQuery={setQuery} />} />
        <Route path="/" element={<SearchPage query={query} setQuery={setQuery} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
