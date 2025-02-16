import React from "react";
import "../../Styles/aboutus.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-hero">
        <h1>Welcome to Bandhan</h1>
        <p>
          Discover your perfect match with Bandhan, a platform built to bring 
          people together and foster lifelong connections.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To create meaningful relationships by combining technology, trust, 
          and personalization. We aim to make your journey to love smooth and secure.
        </p>
      </div>

      <div className="about-highlights">
        <div className="highlight">
          <i className="bi bi-shield-lock-fill"></i>
          <h3>Trustworthy</h3>
          <p>Your privacy and security are our priorities.</p>
        </div>
        <div className="highlight">
          <i className="bi bi-heart-fill"></i>
          <h3>Personalized Matches</h3>
          <p>Matches tailored to your preferences and values.</p>
        </div>
        <div className="highlight">
          <i className="bi bi-link"></i>
          <h3>Meaningful Connections</h3>
          <p>Helping you build relationships that last a lifetime.</p>
        </div>
      </div>

      <div className="about-team">
        <h2>Meet Our Team</h2>
        <p>
          Our passionate team is dedicated to providing you with a seamless 
          and delightful experience. Together, we strive to make Bandhan a 
          platform you can trust and enjoy.
        </p>
        <div className="team-grid">
          <div className="team-member">
            <img src="./images/women-profile.jpg" alt="Team Member" />
            <h4>Ketaki Thakare</h4>
            <p>Co-Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="./images/women-profile.jpg" alt="Team Member" />
            <h4>Mrinal Masne</h4>
            <p>CTO</p>
          </div>
          <div className="team-member">
            <img src="./images/boy-profile.png" alt="Team Member" />
            <h4>Aditya Patil</h4>
            <p>Marketing Head</p>
          </div>
          <div className="team-member">
            <img src="./images/women-profile.jpg" alt="Team Member" />
            <h4>Anuradha Rodage</h4>
            <p>Lead Developer</p>
          </div>
          <div className="team-member">
            <img src="./images/boy-profile.png" alt="Team Member" />
            <h4>Pankhur Negi</h4>
            <p>Customer Success Manager</p>
          </div>
        </div>
      </div>

      <div className="about-footer">
        <h2>Join Us Today</h2>
        <p>
          Start your journey to meaningful connections with Bandhan. 
          We're excited to be part of your story!
        </p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
};

export default AboutUs;

