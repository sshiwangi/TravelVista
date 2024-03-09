import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-heading">
          Embark on a Journey of Discovery with TravelVista
        </div>
        <p className="hero-headline">
          Your go-to platform for sharing and exploring incredible travel
          destinations around the world.
        </p>
        {/* <a href="/auth" className="hero-button">
          {" "}
          Discover Now
        </a> */}
      </div>
      <SearchBar />
    </div>
  );
}

export default Hero;
