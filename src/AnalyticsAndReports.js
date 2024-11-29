import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import "./AnalyticsAndReports.css";

const AnalyticsAndReports = () => {
  const usersChartRef = useRef(null);
  const propertiesChartRef = useRef(null);
  const wishlistedChartRef = useRef(null); // Reference for the new chart

  // Fetch and update Users by Type Chart
  const fetchAndRenderUsersChart = async (usersChartRef, existingChart) => {
    try {
      const response = await axios.get("http://localhost:5001/api/users");
      const users = response.data;

      // Count landlords and tenants
      const landlords = users.filter((user) => user.type === "Owner").length;
      const tenants = users.length - landlords;

      // Destroy existing chart if it exists
      if (existingChart) existingChart.destroy();

      // Create new chart with fetched data
      return new Chart(usersChartRef.current, {
        type: "pie",
        data: {
          labels: ["Landlords", "Tenants"],
          datasets: [
            {
              label: "Users by Type",
              data: [landlords, tenants],
              backgroundColor: ["#36a2eb", "#ff6384"],
            },
          ],
        },
      });
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  // Fetch and update Properties by Category Chart
  const fetchAndRenderPropertiesChart = async (propertiesChartRef, existingChart) => {
    try {
      const response = await axios.get("http://localhost:5001/api/allproperties");
      const properties = response.data;

      // Count properties by type
      const propertyCounts = properties.reduce((acc, property) => {
        const type = property.propertyType;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      // Destroy existing chart if it exists
      if (existingChart) existingChart.destroy();

      // Create new chart with fetched data
      return new Chart(propertiesChartRef.current, {
        type: "bar",
        data: {
          labels: Object.keys(propertyCounts),
          datasets: [
            {
              label: "Properties by Category",
              data: Object.values(propertyCounts),
              backgroundColor: ["#ffcd56", "#4bc0c0", "#9966ff"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching properties data:", error);
    }
  };

  const fetchAndRenderWishlistedChart = async (wishlistedChartRef, existingChart) => {
    try {
      const response = await axios.get("http://localhost:5001/api/top-wishlisted-properties");
      const wishlistedProperties = response.data;
  
      // Generate sequential property names like "Property 1", "Property 2", etc.
      const propertyNames = wishlistedProperties.map((_, index) => `Property ${index + 1}`);
      const wishlistedCounts = wishlistedProperties.map((item) => item.count);
      const propertyIds = wishlistedProperties.map((item) => item._id); 
  
      // Destroy existing chart if it exists
      if (existingChart) existingChart.destroy();
  
      // Create new chart with fetched data
      return new Chart(wishlistedChartRef.current, {
        type: "bar",
        data: {
          labels: propertyNames,
          datasets: [
            {
              label: "Top 10 Wishlisted Properties",
              data: wishlistedCounts,
              backgroundColor: "#ff9f40",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                // Custom tooltip to display the property ID
                label: function (context) {
                  const index = context.dataIndex;
                  const propertyId = propertyIds[index]; // Get the propertyId based on the index
                  return `Property ID: ${propertyId}, Count: ${context.raw}`;
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching wishlisted properties:", error);
    }
  };
  
  useEffect(() => {
    let usersChartInstance;
    let propertiesChartInstance;
    let wishlistedChartInstance;

    fetchAndRenderUsersChart(usersChartRef, usersChartInstance).then(
      (chart) => (usersChartInstance = chart)
    );

    fetchAndRenderPropertiesChart(propertiesChartRef, propertiesChartInstance).then(
      (chart) => (propertiesChartInstance = chart)
    );

    fetchAndRenderWishlistedChart(wishlistedChartRef, wishlistedChartInstance).then(
      (chart) => (wishlistedChartInstance = chart)
    );

    return () => {
      if (usersChartInstance) usersChartInstance.destroy();
      if (propertiesChartInstance) propertiesChartInstance.destroy();
      if (wishlistedChartInstance) wishlistedChartInstance.destroy();
    };
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics and Reports</h2>

      <div className="chart-section">
        <h3>Users by Type</h3>
        <canvas ref={usersChartRef}></canvas>
      </div>

      <div className="chart-section">
        <h3>Properties by Category</h3>
        <canvas ref={propertiesChartRef}></canvas>
      </div>

      <div className="chart-section">
        <h3>Top 10 Wishlisted Properties</h3>
        <canvas ref={wishlistedChartRef}></canvas>
      </div>
    </div>
  );
};

export default AnalyticsAndReports;
