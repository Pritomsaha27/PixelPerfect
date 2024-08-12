import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:searchTerm" element={<SearchPage />} />
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
