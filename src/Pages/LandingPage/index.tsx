import React from "react";
import "./index.css";
import landingImg from "../../Assets/Images/book-8898178_1280.webp";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${landingImg})` }}
    >
      <h1 className="landing-title">
        Library Management <br /> System
      </h1>
      <div className="landing-description">
        <p>
          Welcome to the Library Management System – your gateway to a world of
          knowledge and efficient library management. Our platform streamlines
          library administration, providing a seamless experience for both
          librarians and patrons.
        </p>
        <p>
          Start exploring our collection today, and experience the convenience
          and power of digital library management!
        </p>
      </div>
      <div className="landing-button-container">
        <button
          className="landing-button"
          onClick={() => navigate("/dashboard")} // Navigate to the login page
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
