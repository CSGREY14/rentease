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
![image](https://github.com/user-attachments/assets/902179b7-28b6-421b-b9cc-53c28c4c3c7b)
![image](https://github.com/user-attachments/assets/c91821da-d636-4a37-9698-bffefb3c1982)
![image](https://github.com/user-attachments/assets/14640f54-cd73-469c-88ba-f9eef0c7e2c4)
![image](https://github.com/user-attachments/assets/89b865ab-1025-4b67-924c-0a3bad3d6e0a)
![image](https://github.com/user-attachments/assets/16e681e4-9349-4f51-86f7-8e942c0cbba9)
![image](https://github.com/user-attachments/assets/4a16ffa6-e736-4802-9983-aec819a6a8c0)
![image](https://github.com/user-attachments/assets/cc61643b-33d3-40f0-9130-30e4abfe2902)
![image](https://github.com/user-attachments/assets/14c100b1-508b-4001-b533-1450b6e595e2)
![image](https://github.com/user-attachments/assets/8872c63e-223a-4fe9-af2f-88163ca529cd)
![image](https://github.com/user-attachments/assets/380937bb-b5e4-4ccd-a318-8d0065f76259)
![image](https://github.com/user-attachments/assets/9c4956a1-9bc6-4eb8-b6f9-8821c749baf0)
![image](https://github.com/user-attachments/assets/5d3eccf1-0340-4a28-8d4e-a9ac82e8a8a9)
![image](https://github.com/user-attachments/assets/b84acb5c-d3b6-4f51-a3e7-823d289eb614)
![image](https://github.com/user-attachments/assets/0befd599-a224-4764-bec0-5914312f9ad5)
![image](https://github.com/user-attachments/assets/1c45d637-5fb9-4060-9ffd-f41d702acc57)
![image](https://github.com/user-attachments/assets/2ee38b5b-e84b-466b-8716-2b7b2ef10e38)
![image](https://github.com/user-attachments/assets/f858c84e-8610-45fa-bd66-44d96e07e977)
![image](https://github.com/user-attachments/assets/53d84e06-e93d-495d-abf7-f710f39d9a6b)
![image](https://github.com/user-attachments/assets/9bff14a1-fa7e-434a-b32f-c1d3b32b5d40)


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
