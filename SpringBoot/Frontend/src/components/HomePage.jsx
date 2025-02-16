import React from "react";
//import HeroSection from "../components/Home";
import Features from "../components/Features";
//import HappyStories from "../components/Stories";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Stories from "../components/Stories";
import Content from "../components/Content";
import Subscription from "../components/Subscription";
import FAQSection from "../components/FAQSection";
import NavBar from "../components/NavBar";

function HomePage() {
  return (
    <div>
      <NavBar />
      <Home />
      <Features />
      <Content />
      <Subscription />
      <Stories />
      {/* <FAQSection /> */}
      <Footer />
    </div>
  );
}

export default HomePage;
