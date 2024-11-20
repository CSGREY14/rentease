import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import {
  FaRupeeSign, FaBed, FaBath, FaBuilding, FaRulerCombined, FaMapMarkerAlt, 
  FaBirthdayCake, FaCouch, FaTv, FaFan, FaCar, FaSwimmer, FaWifi, FaDumbbell, FaUserShield,
  FaRestroom,
  FaPersonBooth
} from 'react-icons/fa';
import { FaPersonChalkboard } from "react-icons/fa6";
import {
  MdPets, MdMicrowave, MdOutlineElectricalServices, MdOutlineWaterDrop,
  MdOutlineLocalLaundryService, MdOutlineWheelchairPickup
} from 'react-icons/md';
import './Overview.css';
import { PiOvenDuotone } from "react-icons/pi";
import { TbFridge, TbAirConditioning } from "react-icons/tb";
import { BiMaleFemale, BiSolidWasher } from "react-icons/bi";
import Icon from '@mdi/react';
import { mdiWaterBoiler } from '@mdi/js';
import { mdiFoodForkDrink, mdiSmoking, mdiPartyPopper } from '@mdi/js';
import { GrElevator } from "react-icons/gr";
import { GiOfficeChair } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
function Overview({ property }) {
  // Settings for the React Slick carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  const isCommercial = property.propertyType === 'Commercial';
  const isPG = property.propertyType === 'PG';


  return (
    <div className="overview">
      <div className="carousel-property-info">
        {/* Carousel for images */}
        <div className="carousel">
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {property.uploadedPhotos.map((photo, index) => (
              <div key={index}>
                <img src={`http://localhost:5001/${photo}`} alt={`Property ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        {/* Property Information */}
        <div className="property-info">
          {isCommercial && (
            <>
              <div className="info-item">
                <FaRulerCombined className="info-icon" /> <strong>Area:</strong> {property.area} sqft
              </div>
              <div className="info-item">
                <GiOfficeChair className="info-icon" /> <strong>Seats:</strong> {property.seats}
              </div>
              <div className="info-item">
                <FaPersonChalkboard className="info-icon" /> <strong>Meeting Rooms and Cabins:</strong> {property.meetingRooms}
              </div>
              <div className="info-item">
                <FaRestroom className="info-icon" /> <strong>Washrooms:</strong> {property.washrooms}
              </div>
              <div className="info-item">
                <FaBuilding className="info-icon" /> <strong>Floor:</strong> {property.numberOfFloors} 
              </div>
              <div className="info-item">
                <FaBirthdayCake className="info-icon" /> <strong>Property Age:</strong> {property.propertyAge}
              </div>
            </>
          ) } {property.propertyType==='Residential' && (
            <>
              <div className="info-item">
                <FaRulerCombined className="info-icon" /> <strong>Area:</strong> {property.carpetArea} sqft
              </div>
              <div className="info-item">
                <FaBed className="info-icon" /> <strong>Configuration:</strong> {property.bedrooms} BHK, {property.bathrooms} Baths
              </div>
              <div className="info-item">
                <FaRupeeSign className="info-icon" /> <strong>Price:</strong> {property.expectedRent} ({(property.expectedRent / property.carpetArea).toFixed(2)} per sqft)
              </div>
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" /> <strong>Address:</strong> {property.locality}, {property.city}
              </div>
              <div className="info-item">
                <FaBuilding className="info-icon" /> <strong>Floors:</strong> {property.numberOfFloors}
              </div>
              <div className="info-item">
                <FaBirthdayCake className="info-icon" /> <strong>Property Age:</strong> {property.propertyAge}
              </div>
            </>
          )}{isPG && (
            <>
            <div className="info-item">
              <FaRupeeSign className="info-icon" /> <strong>Expected Rent:</strong> {property.expectedRent}
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" /> <strong>Address:</strong> {property.locality}, {property.city}
            </div>
            <div className="info-item">
              <FaCouch className="info-icon" /> <strong>Furnishing Status:</strong> {property.isFurnished}
            </div>
            <div className="info-item">
              <BiMaleFemale className="info-icon" /> <strong>Gender Preference:</strong> {property.genderPreference}
            </div>
            <div className="info-item">
              <FaBed className="info-icon" /> <strong>Room Type:</strong> {property.roomType} ({property.roomType === 'Sharing' ? `${property.sharingCount} Sharing` : 'Single'})
            </div>
            <div className="info-item">
            <FaBed className="info-icon" /> <strong>Configuration:</strong> {property.bedrooms} BHK, {property.bathrooms} Baths
            </div></>
          )}
        </div>
      </div>

      <hr />
      {/* About Property Section */}
      <div className="about-property">
        <h3>About Property</h3>
        <p>{property.uniqueFeatures}</p>
        <p><strong>Transaction Type:</strong> {property.sellRent}</p>
        <p><strong>Furnishing Status:</strong> {property.propertyType==='Commercial'?(property.readyToMove==='yes'?('Ready to move'):('Bare shell office')) :(property.isFurnished)}</p>
        <p><strong>Property ID:</strong> {property._id}</p>
      </div>

      <hr />

      {/* Furnishing Details Section */}
      {(property.propertyType=='Residential' || property.propertyType=='PG') &&<>
      <div className="furnishing-details">
        <h3>Furnishing Details</h3>
        <div className="appliances">
          {Object.entries(property.appliances).map(([appliance, count]) => (
            <div key={appliance} className="appliance-item">
              {appliance === 'refrigerator' && <TbFridge className="appliance-icon" />}
              {appliance === 'washingMachine' && <BiSolidWasher className="appliance-icon" />}
              {appliance === 'airConditioner' && <TbAirConditioning className="appliance-icon" />}
              {appliance === 'heater' && <Icon path={mdiWaterBoiler} size={1} />}
              {appliance === 'oven' && <PiOvenDuotone className="appliance-icon" />}
              {appliance === 'microwave' && <MdMicrowave className="appliance-icon" />}
              <span>{count} x {appliance}</span>
            </div>
          ))}
        </div>
      </div>

      <hr /></>
      }  
      {/* Amenities Section */}
      
      <div className="amenities">
        <h3>{isCommercial ? 'Commercial Facilities' : 'Amenities'}</h3>
        <div className="amenities-list">
          {isCommercial ? (
            <>
              {property.conferenceArea=="Available" && (
                <div className="amenity-item">
                  <img src='./workshops.png' className="own-icon" /> Conference Area
                </div>
              )}
              {property.receptionArea=="Available" && (
                <div className="amenity-item">
                  <img src='./reception-desk.png' className="own-icon" /> Reception Area
                </div>
              )}
              {property.oxygenDuct=="Available" && (
                <div className="amenity-item">
                  <img src='./ventilation.png' className="own-icon" /> Oxygen Duct
                </div>
              )}
              {property.maintenanceStaff=="Available" && (
                <div className="amenity-item">
                  <img src='./mechanic.png' className="own-icon" /> Maintenance Staff
                </div>
              )}
              {property.serviceLift=="Available" && (
                <div className="amenity-item">
                  <img src='./repair.png' className="own-icon" /> Service Lift
                </div>
              )}
              {property.waterStorage=="Available" && (
                <div className="amenity-item">
                  <img src='./water-tank.png' className="own-icon" /> Water Storage
                </div>
              )}
              {property.wasteDisposal=="Available" && (
                <div className="amenity-item">
                  <img src='./recycle-bin.png' className="own-icon" /> Waste Disposal
                </div>
              )}
              {property.ups=="Available" && (
                <div className="amenity-item">
                  <img src='./power-supply.png' className="own-icon" /> UPS
                </div>
              )}
              {property.parking=="Available" && (
                <div className="amenity-item">
                  <img src='./parking.png' className="own-icon" /> Parking
                </div>
              )}
              {property.fireAlarm && (
                <div className="amenity-item">
                  <img src='./smoke-detector.png' className="own-icon" /> Fire Alarm
                </div>
              )}
              {property.securityAlarm && (
                <div className="amenity-item">
                  <img src='./siren.png' className="own-icon" /> Security Alarm
                </div>
              )}
              {property.fireExtinguisher && (
                <div className="amenity-item">
                  <img src='./extinguisher.png' className="own-icon" /> Fire Extinguisher
                </div>
              )}
              {property.centralAC && (
                <div className="amenity-item">
                  <img src='./air-conditioner.png' className="own-icon" /> Central AC
                </div>
              )}
              {property.cctv && (
                <div className="amenity-item">
                  <img src='./cctv-camera.png' className="own-icon" /> CCTV
                </div>
              )}
              {property.securityPersonnel && (
                <div className="amenity-item">
                  <img src='./policeman.png' className="own-icon" /> Security Personnel
                </div>
              )}
            </>
          ) : (
          <>
          {property.amenities.parkingAvailable && <div className="amenity-item"><FaCar className="amenity-icon" /> Parking</div>}
          {property.amenities.lift && <div className="amenity-item"><GrElevator className="amenity-icon" /> Lift</div>}
          {property.amenities.petFriendly && <div className="amenity-item"><MdPets className="amenity-icon" /> Pet Friendly</div>}
          {property.amenities.wifi && <div className="amenity-item"><FaWifi className="amenity-icon" /> WiFi</div>}
          {property.amenities.powerBackup && <div className="amenity-item"><MdOutlineElectricalServices className="amenity-icon" /> Power Backup</div>}
          {property.amenities.roomCleaningService && <div className="amenity-item"><MdOutlineLocalLaundryService className="amenity-icon" /> Room Cleaning</div>}
          {property.amenities.electricChargesIncluded && <div className="amenity-item"><MdOutlineElectricalServices className="amenity-icon" /> Electric Charges Included</div>}
          {property.amenities.waterChargesIncluded && <div className="amenity-item"><MdOutlineWaterDrop className="amenity-icon" /> Water Charges Included</div>}
          {property.amenities.swimmingPool && <div className="amenity-item"><FaSwimmer className="amenity-icon" /> Swimming Pool</div>}
          {property.amenities.gymnasium && <div className="amenity-item"><FaDumbbell className="amenity-icon" /> Gym</div>}
          {property.amenities.wheelchairFriendly && <div className="amenity-item"><MdOutlineWheelchairPickup className="amenity-icon" /> Wheelchair Friendly</div>}
          {property.amenities.tv && <div className="amenity-item"><FaTv className="amenity-icon" /> TV</div>}
          {property.amenities.waterCooler && <div className="amenity-item"><img src="./water-cooler.png" alt="Water Cooler" className="own-icon" /> Water Cooler</div>}
          {property.amenities.waterPurifier && <div className="amenity-item"><img src="./filter.png" className="own-icon" /> Water Purifier</div>}
          </>
          )}
        </div>
      </div> 
    <hr />
{/* House Rules */}
{isPG && (
  <div className="house-rules">
    <h3>House Rules</h3>
    <div className="rules-list">
      {/* Meals */}
      <div className="rule-item">
        <Icon path={mdiFoodForkDrink} size={1} /> <strong>Breakfast:</strong> {property.houseRules.breakfast ? "Yes" : "No"}
      </div>
      <div className="rule-item">
        <Icon path={mdiFoodForkDrink} size={1} /> <strong>Lunch:</strong> {property.houseRules.lunch ? "Yes" : "No"}
      </div>
      <div className="rule-item">
        <Icon path={mdiFoodForkDrink} size={1} /> <strong>Dinner:</strong> {property.houseRules.dinner ? "Yes" : "No"}
      </div>
      <div className="rule-item">
        <Icon path={mdiFoodForkDrink} size={1} /> <strong>Food Type: </strong> {property.houseRules.mealsProvidedVeg && "Veg  "} {property.houseRules.mealsProvidedNonVeg && "Non-Veg"} 
      </div>
      <div className="rule-item">
        <Icon path={mdiFoodForkDrink} size={1} /> <strong>Food Charges:</strong> {property.houseRules.foodCharges ? "Yes" : "No"}
      </div>

      {/* Visitor and Party Rules */}
      <div className="rule-item">
        <Icon path={mdiPartyPopper} size={1} /> <strong>Visitors Allowed:</strong> {property.houseRules.visitorsAllowed ? "Yes" : "No"}
      </div>
      <div className="rule-item">
        <Icon path={mdiPartyPopper} size={1} /> <strong>Parties Allowed:</strong> {property.houseRules.partyAllowed ? "Yes" : "No"}
      </div>

      {/* Smoking and Drinking */}
      <div className="rule-item">
        <Icon path={mdiSmoking} size={1} /> <strong>Smoking Allowed:</strong> {property.houseRules.smokingAllowed ? "Yes" : "No"}
      </div>
      <div className="rule-item">
        <Icon path={mdiSmoking} size={1} /> <strong>Drinking Allowed:</strong> {property.houseRules.drinkingAllowed ? "Yes" : "No"}
      </div>

      <div className="rule-item">
        <FaUserShield className="rule-icon" /> <strong>Warden Present:</strong> {property.houseRules.wardenPresent ? "Yes" : "No"}
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Overview;
