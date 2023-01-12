import "./Favorites.scss";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import HeartSolid from "../../assets/icons/heart-solid.svg";
import Heart from "../../assets/icons/heart-regular.svg";

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
  const checkFaves = (id) => {
    const boolean = favorites.some((hike) => hike.id === id);
    return boolean;
  };

  return (
    <>
      <section className="favorites__wrapper">
        <Link to="/hikes">
          <button className="favorites__btn">Back</button>
        </Link>
        <div className="favorites">
          {favorites?.length > 0 ? (
            favorites?.map((hike) => (
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
                          alt="Solid heart icon"
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
            ))
          ) : (
            <h1 className="favorites__msg">
              Whoops, looks like you don't have any favorite hikes yet!
            </h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Favorites;
