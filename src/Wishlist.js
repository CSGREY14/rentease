import React from "react";
import "./Wishlist.css";

// Stub wishlisted property data
const wishlistedProperties = [
  {
    id: 1,
    images: [
      "https://via.placeholder.com/300x200?text=Wishlist+Property+1+Image+1",
      "https://via.placeholder.com/300x200?text=Wishlist+Property+1+Image+2",
    ],
    title: "Modern Studio",
    location: "Miami",
    price: "$2500/month",
    type: "Residential",
  },
  {
    id: 2,
    images: [
      "https://via.placeholder.com/300x200?text=Wishlist+Property+2+Image+1",
      "https://via.placeholder.com/300x200?text=Wishlist+Property+2+Image+2",
    ],
    title: "Beachfront Villa",
    location: "San Diego",
    price: "$7000/month",
    type: "Residential",
  },
  {
    id: 3,
    images: [
      "https://via.placeholder.com/300x200?text=Wishlist+Property+3+Image+1",
      "https://via.placeholder.com/300x200?text=Wishlist+Property+3+Image+2",
    ],
    title: "Cozy Cabin",
    location: "Aspen",
    price: "$4500/month",
    type: "Residential",
  },
];

const Wishlist = () => {
  return (
    <div className="wishlist-container">
      <h2>Your Wishlisted Properties</h2>
      <div className="card-grid">
        {wishlistedProperties.map((property) => (
          <div className="card" key={property.id}>
            <div className="carousel">
              {property.images.map((image, index) => (
                <img
                  src={image}
                  alt={`Wishlist Property ${property.id} Image ${index + 1}`}
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

export default Wishlist;
