import React from "react";
import Hero from "../Main Component/Hero";
import Blog from "../Main Component/Blog";
import Places from "../Main Component/Places";
import Footer from "../Main Component/Footer";

function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Places />
      <Blog />
      <Footer />
    </div>
  );
}

export default Home;
