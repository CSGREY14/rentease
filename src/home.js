import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./navbar";
import SearchBar from "./searchbar";
import RecommendedProperties from "./recommendedproperties";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import MaintenancePage from "./MaintenancePage";

// This function checks if the website is under maintenance
const checkMaintenanceMode = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/maintenance");
    const data = await response.json();
    return data.maintenanceMode; // Returns true or false based on maintenance mode status
  } catch (error) {
    console.error("Error fetching maintenance mode status:", error);
    return false; // Default to false if error occurs
  }
};

function Home() {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch the maintenance mode status when the component loads
    const fetchMaintenanceStatus = async () => {
      const maintenanceStatus = await checkMaintenanceMode();
      setIsMaintenance(maintenanceStatus);
      setLoading(false); // Set loading to false once the status is fetched
    };

    fetchMaintenanceStatus();
  }, []);

  if (loading) {
    // Show loading spinner while the maintenance mode is being checked
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isMaintenance && user.type !== "Admin") {
    // If in maintenance mode and user is not Admin, show maintenance page
    return (
      <MaintenancePage/>
    );
  }
else{
  return (
    <div className="App">
      <Navbar />
       {/* Image with Catchy Text */}
       <div className="image-container">
        <img src="./hero_banner.jpg" alt="Placeholder House" className="placeholder-image" />
        <div className="image-text">
          <h1>Find Your Dream Home Today!</h1>
          <p>Explore the best properties in your locality.</p>
        </div>
      </div>
      <SearchBar />
      <RecommendedProperties locality={user.locality} />
    </div>
  );
}}

export default Home;
