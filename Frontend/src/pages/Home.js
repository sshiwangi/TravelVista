import React from "react";
import Places from "../Main Component/Places";
import Footer from "../Main Component/Footer";
import HeroSection from "../Main Component/HeroSection";

function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <Places />
      <Footer />
    </div>
  );
}

export default Home;
