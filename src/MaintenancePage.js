import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./MaintenancePage.css";

function MaintenancePage() {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="maintenance-container">
      {/* Video background */}
      <video className="maintenance-video" autoPlay loop muted>
        <source src="./website_maintenance.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content overlay */}
      <Box className="maintenance-content">
        <Typography variant="h3" color="primary" gutterBottom>
          🚧 Website Under Maintenance 🚧
        </Typography>
        <Typography variant="h5" className="maintenance-text" paragraph>
          We're working hard to improve your experience. Please check back soon!
        </Typography>

        <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/contact")}
          >
            Contact Support
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default MaintenancePage;
