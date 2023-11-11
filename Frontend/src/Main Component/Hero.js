import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-heading">
          Embark on a Journey of Discovery with TravelVista
        </div>
        <p className="hero-headline">
          your go-to platform for sharing and exploring incredible travel
          destinations around the world.
        </p>
        <Link to="/auth" className="hero-button">
          {" "}
          Discover Now
        </Link>
      </div>
    </div>
  );
}

export default Hero;
