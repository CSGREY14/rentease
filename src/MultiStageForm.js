import React, { useState, useEffect } from 'react';
import PostProperty from './PostProperty';
import LocationDetails from './LocationDetails';
import PropertyProfile from './PropertyProfile'; // For Residential
import PropertyProfileCommercial from './PropertyProfileCommercial'; // For Commercial
import PhotoUpload from './PhotoUpload';
import PricingForm from './PricingForm';
import VastuCalc from './VastuCalc';
import Navbar from './navbar';
function MultiStageForm() {
  const [step, setStep] = useState(1); // To track the current step
  const [formData, setFormData] = useState({
    propertyType: 'Residential', // Default to 'Residential'
    sellRent: 'Rent/Lease',
    propertySubtype: '',  
    ownerName: '', // Added owner name field
    contactNumber: '', // Added contact number field
    city: '',
    rating:2.5,
    vastuScore:50,
    locality: '',
    subLocality: '',
    apartment: '',
    houseNumber: '',
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    roomType: 'Private',
    peopleSharing: 0, // Number of people sharing the room
    carpetArea: 1, // Added carpet area
    isFurnished: 'No', // Added furnished status
    readyToMove:'no',
    appliances: { // Added appliances count as an object
      refrigerator: 0,
      washingMachine: 0,
      airConditioner: 0,
      heater: 0,
      oven: 0,
      microwave: 0,
    },
    numberOfFloors: 1, // Added number of floors
    propertyAge: 0, // Added age of property
    availableFrom: '', // Added available-from date
    tenantPreference: '', // Added tenant preference (options: 'Student', 'Working Professional', 'Both')
    genderPreference: '', // Added gender preference (options: 'Boys', 'Girls', 'Both')
    uniqueFeatures: '', // Added unique features
    
    // Additional commercial-specific fields
    seats: 0,
    meetingRooms: 0,
    cabins: 0,
    washrooms: 0,
    conferenceArea: 'Not Available',
    receptionArea: 'Not Available',
    oxygenDuct: 'Not Available',
    maintenanceStaff: 'Not Available',
    serviceLift: 'Not Available',
    waterStorage: 'Not Available',
    wasteDisposal: 'Not Available',
    ups: 'Not Available',
    parking: 'Not Available',
    
    // Security and safety features
    fireAlarm: false,
    securityAlarm: false,
    fireExtinguisher: false,
    centralAC: false,
    cctv: false,
    securityPersonnel: false,
    
    // New amenities for PG
    amenities: {
      parkingAvailable: false,
      lift: false,
      petFriendly: false,
      wifi: false,
      ac: false,
      powerBackup: false,
      roomCleaningService: false,
      electricChargesIncluded: false,
      waterChargesIncluded: false,
      swimmingPool: false,
      gymnasium: false,
      wheelchairFriendly: false,
      tv: false,     
      waterCooler: false,
      waterPurifier: false,
    },
  
    // New house rules for PG
    houseRules: {
      breakfast: false,
      lunch: false,
      dinner: false,
      mealsProvidedVeg: false,
      mealsProvidedNonVeg: false,
      foodChargesIncluded: false,
      gateClosingTime: '10:00', // Add time input for gate closing time
      visitorsAllowed: false,
      partyAllowed: false,
      warden: false,
      smokingAllowed: false,
      drinkingAllowed: false,
    },
    availableStatus: true,
    renterName: '',
    uploadedPhotos: [],
  });

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // If user is logged in, set owner name and contact number from localStorage
      setFormData((prevData) => ({
        ...prevData,
        ownerName: user.name || '', // Assuming 'name' exists in localStorage user object
        contactNumber: user.phone_no || '', // Assuming 'contactNumber' exists in localStorage user object
      }));
    }
  }, []);

  // Function to update the form data
  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Function to handle step navigation
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Function to handle the final submission
  const handleSubmit = () => {
    console.log('Final Data Submitted: ', formData);
    // Make API call to submit data to backend here
  };

  return (
    <div>
<Navbar/>
      {step === 1 && (
        <PostProperty
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <LocationDetails
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <>
          {/* Conditionally render either PropertyProfile or PropertyProfileCommercial */} 
          {formData.propertyType === 'Commercial' ? (
            <PropertyProfileCommercial
              formData={formData}
              updateFormData={updateFormData}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          ) : (
            <PropertyProfile
              formData={formData}
              updateFormData={updateFormData}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
        </>
      )}
      {step === 4 && (
        <PhotoUpload
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <VastuCalc
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 6 && (
        <PricingForm
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
    </div>
  );
}

export default MultiStageForm;
