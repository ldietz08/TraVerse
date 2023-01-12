import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import ExplorePage from "./components/explore-page/ExplorePage";
import HikeInfo from "./components/hike-info/HikeInfo";
import Map from "./components/map/Map";
import Login from "./components/login/Login";
import Bulletin from "./components/bulletin/Bulletin";
import Favorites from "./components/favorites/Favorites"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/footer/Footer";
import "./App.scss";

const App = () => {
  const [hikes, setHikes] = useState([]);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const BACK_END_URL = `${process.env.REACT_APP_BACKEND_URL}/hikes`;

  useEffect(() => {
    const getHikes = async () => {
      try {
        const { data } = await axios.get(BACK_END_URL);
        setHikes(data);
        console.log(data);
      } catch (error) {
        console.log("An error has occurred", error);
      }
    };
    getHikes();
  }, []);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Header setIsAuth={setIsAuth} isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route
              hikes={hikes}
              path="hikes"
              element={<ExplorePage hikes={hikes} />}
            />
            <Route path="hikes/:id" element={<HikeInfo hikes={hikes} />} />
            <Route path="hikes/:id" element={<Map hikes={hikes} />} />
            <Route path="login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="bulletin" element={<Bulletin isAuth={isAuth} />} />
            <Route path="favorites" element={<Favorites />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
