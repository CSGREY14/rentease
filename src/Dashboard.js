import React from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome Back!</h2>
      <div className="dashboard-overview">
        <div className="dashboard-card">
          <h3>Listed Properties</h3>
          <p>5</p>
        </div>
        <div className="dashboard-card">
          <h3>Wishlisted Properties</h3>
          <p>3</p>
        </div>
        <div className="dashboard-card">
          <h3>Active Tenants</h3>
          <p>2</p>
        </div>
      </div>
      <div className="dashboard-recent">
        <h3>Recent Activity</h3>
        <div className="recent-activity-cards">
          <div className="activity-card">
            <div className="activity-icon">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="activity-details">
              <p>
                <strong>John Doe</strong> rated <em>"Cozy Cabin, Aspen"</em>{" "}
                <strong>4.8 stars</strong>.
              </p>
              <small>2 hours ago</small>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="activity-details">
              <p>
                <strong>Emma Watson</strong> requested to rent{" "}
                <em>"Beachfront Villa, Miami"</em>.
              </p>
              <small>1 day ago</small>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <div className="activity-details">
              <p>
                You added <em>"Luxury Apartment, LA"</em> to listings.
              </p>
              <small>3 days ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
