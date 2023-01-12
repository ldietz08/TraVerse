import "./Hero.scss";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <Link className="hero__link" to={"hikes"}>
          <h1 className="hero__title">Start Exploring</h1>
        </Link>
      </div>
    </>
  );
};

export default Hero;
