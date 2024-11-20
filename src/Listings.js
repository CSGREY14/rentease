import React from "react";
import "./Listings.css";

// Stub property data
const properties = [
  {
    id: 1,
    images: [
      "https://via.placeholder.com/300x200?text=Property+1+Image+1",
      "https://via.placeholder.com/300x200?text=Property+1+Image+2",
      "https://via.placeholder.com/300x200?text=Property+1+Image+3",
    ],
    title: "Cozy Apartment",
    location: "New York",
    price: "$2000/month",
    type: "Residential",
  },
  {
    id: 2,
    images: [
      "https://via.placeholder.com/300x200?text=Property+2+Image+1",
      "https://via.placeholder.com/300x200?text=Property+2+Image+2",
    ],
    title: "Luxury Villa",
    location: "Los Angeles",
    price: "$5000/month",
    type: "Residential",
  },
  {
    id: 3,
    images: [
      "https://via.placeholder.com/300x200?text=Property+3+Image+1",
      "https://via.placeholder.com/300x200?text=Property+3+Image+2",
    ],
    title: "Office Space",
    location: "Chicago",
    price: "$3000/month",
    type: "Commercial",
  },
];

const Listings = () => {
  return (
    <div className="listings-container">
      <h2>Your Posted Properties</h2>
      <div className="card-grid">
        {properties.map((property) => (
          <div className="card" key={property.id}>
            <div className="carousel">
              {property.images.map((image, index) => (
                <img
                  src={image}
                  alt={`Property ${property.id} Image ${index + 1}`}
                  key={index}
                />
              ))}
            </div>
            <div className="details">
              <h3>{property.title}</h3>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Price:</strong> {property.price}</p>
              <p><strong>Type:</strong> {property.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
