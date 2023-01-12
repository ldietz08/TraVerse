import "./HikeInfo.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../../assets/icons/rating.png";

const HikeInfo = () => {
  const params = useParams();
  const [hikeInfo, setHikeInfo] = useState([]);

  const BACK_END_URL = `${process.env.REACT_APP_BACKEND_URL}/hikes/${params.id}`;

  useEffect(() => {
    const fetchHikes = () => {
      axios
        .get(BACK_END_URL)
        .then((response) => {
          setHikeInfo(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchHikes();
  }, [params.id]);

  return (
    <>
      <section className="information">
        {hikeInfo && (
          <main className="info__container" key={hikeInfo.id}>
            <div className="info__wrapper">
              <div className="info__img-wrapper">
                <div className="info">
                  <div className="info__heading">
                    <h2 className="info__title">{hikeInfo.name}</h2>
                  </div>
                  <p className="info__location">{hikeInfo.location}</p>
                  <div className="info__details">
                    <p className="info__difficulty">
                      <span className="info__details--bold">Difficulty: </span>
                      {hikeInfo.difficulty}
                    </p>
                    <p className="info__time">
                      <span className="info__details--bold">Time: </span>
                      {hikeInfo.time}
                    </p>
                  </div>
                  <div className="info__details">
                    <p className="info__length">
                      <span className="info__details--bold">Length: </span>
                      {hikeInfo.length}
                    </p>
                    <p className="info__elevation">
                      <span className="info__details--bold">Elevation: </span>
                      {hikeInfo.elevation}
                    </p>
                  </div>
                  <div className="info__season-container">
                    <p className="info__season">
                      <span className="info__details--bold">Season: </span>
                      {hikeInfo.season}
                    </p>
                  </div>
                  <div className="info__rating-container">
                    <img
                      className="info__rating"
                      src={Rating}
                      alt="star rating"
                    ></img>
                  </div>
                </div>
                <img
                  className="info__img"
                  src={hikeInfo.image}
                  alt="Moutainous region"
                ></img>
              </div>
              <div className="info__container">
                <div>
                  <p className="info__text">{hikeInfo.description}</p>
                </div>
              </div>
            </div>
          </main>
        )}
      </section>
      <div className="info__map">
        <img
          className="info__img-map"
          src={hikeInfo.map}
          alt="Map of trail"
        ></img>
      </div>
    </>
  );
};

export default HikeInfo;
