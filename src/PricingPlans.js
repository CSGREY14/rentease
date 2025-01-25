import React from 'react';
import './PricingPlans.css'; // Import your custom CSS
import Navbar from './navbar'; // Assuming Navbar is in the same folder
import axios from 'axios';

const plans = [
  {
    name: "Free",
    price: "$0/month",
    features: [
      "Basic property listings",
      "Access to community discussion forums",
      "Weekly market insights",
      "Email support",
      "Basic search and filter options",
    ],
    buttonText: "Try Now",
  },
  {
    name: "Premium",
    price: "$10/month",
    features: [
      "Enhanced property listings with images",
      "Access to exclusive community events",
      "Advanced market analytics",
      "Priority email support",
      "Custom search filters and saved searches",
      "Personalized property recommendations",
    ],
    buttonText: "Buy Plan",
  },
  {
    name: "Pro",
    price: "$20/month",
    features: [
      "Unlimited property listings",
      "Dedicated account manager",
      "Real-time chat support",
      "Early access to new features",
      "Advanced property analytics and insights",
      "Collaboration tools for landlords and tenants",
      "Priority support 24/7",
    ],
    buttonText: "Buy Plan",
  },
];

function PricingPlans() {
  const handlePlanPurchase = async (planName) => {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      alert("Please log in to subscribe.");
      return;
    }
    
    // Update the subscription tier in localStorage
    user.subscription_tier = planName;
    localStorage.setItem("user", JSON.stringify(user));

    // Send the updated user data to the API endpoint
    try {
      const response = await axios.post('http://localhost:5001/api/update-subscription', {
        userId: user._id,
        subscription_tier: planName,
      });

      if (response.data.success) {
        alert("Subscription updated successfully!");
      } else {
        alert("Failed to update subscription. Please try again.");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      alert("An error occurred while updating your subscription.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="pricing-plans">
        <h1>Choose your Plan</h1>
        <p>Unlock the Features That Matter to You</p>
        <div className="plan-container">
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <h2>{plan.name}</h2>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button onClick={() => handlePlanPurchase(plan.name)}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PricingPlans;
