# 🏠 RentEase – Smart Rental Property Platform

RentEase is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to simplify property rentals for tenants, landlords, and PG operators. It offers intelligent property recommendations, Vastu/Feng Shui-based scoring, and a user-friendly rating system.

---

## 🚀 Features

- 🔍 **Smart Search & Filters** – Browse properties by type (Residential, Commercial, PG), location, rent, furnishing, and more.
- 🧠 **Pricing Recommendation Engine** – Suggests fair rent based on location, amenities, and Vastu/Feng Shui compatibility.
- 🧭 **Vastu/Feng Shui Evaluation** – Calculates compatibility using user-inputted questionnaire results.
- ⭐ **Ratings & Reviews** – Tenants, landlords, and properties can be rated using a 5-star system.
- 📋 **Property Details & Dealer Info** – View full property specs, dealer profiles, and send inquiries.
- 🛠️ **Admin Dashboard** – Manage users, properties, and platform-wide settings.
- 🖼️ **Image Upload & Gallery** – Upload property photos, with images stored locally and paths in MongoDB.

---

## 🧰 Tech Stack

- **Frontend**: React.js, Material-UI, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Geospatial Tools**: QGIS, Leaflet
- **Other Tools**: Axios, Multer, EmailJS (for alerts/inquiries)

---

## 📸 Screenshots


---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rentease.git
cd rentease

# Install server and client dependencies
cd server
npm install

cd ../client
npm install

# Start backend and frontend
npm run dev # or use concurrently to run both
