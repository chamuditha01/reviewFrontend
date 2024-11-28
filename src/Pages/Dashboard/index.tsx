import React, { useState, useEffect } from "react";
import "./home.css";
import Header from "../../Components/Molecules/Header";
import Sidebar from "../../Components/Molecules/Sidebar";
import Home from "../../Components/Molecules/Home";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const Dashboard: React.FC = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    //console.log("Token:", token); //optional
    
    if (!token) {
      localStorage.setItem("redirectMessage", "Please login to access the dashboard.");
      
      return;
    }
    

    try {
      const decodedToken: any = jwtDecode(token); // Decode the JWT token
      const currentTime = Date.now() / 1000; // Get the current time in seconds
      const tokenExpirationTime = decodedToken.exp; // Extract expiration time from the decoded token

      //console.log("Token expiration time:", tokenExpirationTime); //optional
      //console.log("Current time:", currentTime); //optional

      // Check if the token is expired
      if (currentTime > tokenExpirationTime) {
        console.log("Session expired, redirecting to login.");
        localStorage.removeItem("authToken"); // Remove token from localStorage if expired
        window.location.href = "/login"; // Redirect to login page
      }
    } catch (error) {
      console.error("Invalid token, redirecting to login.");
      localStorage.removeItem("authToken"); // Clean up invalid token
      window.location.href = "/login"; // Redirect to login page
    }
  }, []);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Home />
    </div>
  );
};

export default Dashboard;
