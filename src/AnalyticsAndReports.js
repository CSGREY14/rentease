import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./AnalyticsAndReports.css";

const AnalyticsAndReports = () => {
  const usersChartRef = useRef(null);
  const propertiesChartRef = useRef(null);
  const inquiriesChartRef = useRef(null);

  useEffect(() => {
    // Users by Type Chart
    const usersChart = new Chart(usersChartRef.current, {
      type: "pie",
      data: {
        labels: ["Landlords", "Tenants"],
        datasets: [
          {
            label: "Users by Type",
            data: [50, 100], // Stub data
            backgroundColor: ["#36a2eb", "#ff6384"],
          },
        ],
      },
    });

    // Properties by Category Chart
    const propertiesChart = new Chart(propertiesChartRef.current, {
      type: "bar",
      data: {
        labels: ["Residential", "Commercial", "PG"],
        datasets: [
          {
            label: "Properties by Category",
            data: [75, 25, 10], // Stub data
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

    // Monthly Inquiries Chart
    const inquiriesChart = new Chart(inquiriesChartRef.current, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Monthly Inquiries",
            data: [20, 35, 40, 50, 65, 70, 80, 90, 100, 110, 120, 150], // Stub data
            borderColor: "#36a2eb",
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
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

    return () => {
      // Cleanup chart instances
      usersChart.destroy();
      propertiesChart.destroy();
      inquiriesChart.destroy();
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
        <h3>Monthly Inquiries</h3>
        <canvas ref={inquiriesChartRef}></canvas>
      </div>
    </div>
  );
};

export default AnalyticsAndReports;
