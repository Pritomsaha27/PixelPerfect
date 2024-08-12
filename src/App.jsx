import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Home from './components/Home';



function App() {
  const [image, setImage] = useState([]);
  const [search, setSearch] = useState(["mumbai"]);

const API_KEY="ZUmSFKgLX1vSTTJvZ1USdGMarZfkaeek8Ql99p9xXUkzVyt5U5bO62KJ"

useEffect(()=>{
  const fetchImg = async () => {
    const res = await axios.get(
      `https://api.pexels.com/v1/search?query=${search}&per_page=80`,{
        headers:{
          "Authorization": API_KEY
        },
      }
    );
    setImage(res.data.photos)
  }
  fetchImg();
},[search])


return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home setSearch={setSearch} images={image}/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
