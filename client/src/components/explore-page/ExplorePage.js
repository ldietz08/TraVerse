import "./ExplorePage.scss";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import HeartSolid from "../../assets/icons/heart-solid.svg";
import Heart from "../../assets/icons/heart-regular.svg";

const ExplorePage = ({ hikes }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
  const [query, setQuery] = useState("");

  const checkFaves = (id) => {
    const boolean = favorites.some((hike) => hike.id === id);
    return boolean;
  };

  return (
    <>
      <div className="search">
        <input
          className="search__body"
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <div className="select__container">
          <select className="select" onChange={(e) => setQuery(e.target.value)}>
            <option
              className="select__option"
              disabled
              hidden
              selected
            >
              Select difficulty
            </option>
            <option id="select__option" value="easy">
              Easy
            </option>
            <option className="select__option" value="intermediate">
              Intermediate
            </option>
            <option className="select__option" value="difficult">
              Difficult
            </option>
          </select>
          <span className="custom-arrow"></span>
        </div>
      </div>
      <section className="wrapper">
        {hikes
          .filter(
            (hike) =>
              hike.location.toLowerCase().includes(query) ||
              hike.name.toLowerCase().includes(query) ||
              hike.difficulty.toLowerCase().includes(query)
          )
          .map((hike) => (
            <div className="card" key={hike.id}>
              <div className="card__body">
                <img
                  className="card__img"
                  src={hike.image}
                  alt="Moutainous region"
                ></img>
                <div className="card__fave">
                  <h2 className="card__title">{hike.name}</h2>
                  {checkFaves(hike.id) ? (
                    <button
                      className="card__btn-fav"
                      onClick={() => removeFromFavorites(hike.id)}
                    >
                      <img
                        className="card__heart-solid"
                        src={HeartSolid}
                        alt="Solid Heart icon"
                      ></img>
                    </button>
                  ) : (
                    <button
                      className="card__btn-fav"
                      onClick={() => addToFavorites(hike)}
                    >
                      <img
                        className="card__heart"
                        src={Heart}
                        alt="Heart icon"
                      ></img>
                    </button>
                  )}
                </div>
                <p className="card__location">{hike.location}</p>
              </div>
              <div>
                <Link to={`${hike.id}`}>
                  <button className="card__button">View More</button>
                </Link>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default ExplorePage;
