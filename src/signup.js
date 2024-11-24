import React, { useState } from "react";
import "./signup.css"; 

function SignIn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    type: "student",
    dob: "",
    locality: "White Town",
    password: "" // Add password field
  });
  
  const localities = [
    "White Town", "Muthialpet", "Lawspet", "Reddiarpalayam", "Ouppalam", "Auroville", 
    "Serenity Beach", "Chinna Veerampattinam", "Kottakuppam", "Mudaliarpet", 
    "Ariyankuppam", "Thavalakuppam", "Kuyavarpalayam", "Villiyanur", 
    "Thirubuvanai", "Karuvadikuppam", "Bahour"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to  backend using fetch
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);

      // Redirect to the login page on success
    if (data.status === "success") {
      window.location.href = "/login"; // Adjust the path as needed
    }
    })
    
    .catch((error) => {
      console.error("There was an error!", error);
    });
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone No */}
        <div>
          <label>Phone No:</label>
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            required
          />
        </div>

        {/* Type */}
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="single_men">Single Men</option>
            <option value="family">Family</option>
            <option value="commercial">Commercial buyer</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* DOB */}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* Locality */}
        <div>
          <label>Locality:</label>
          <select name="locality" value={formData.locality} onChange={handleChange}>
            {localities.map((locality, index) => (
              <option key={index} value={locality}>
                {locality}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
