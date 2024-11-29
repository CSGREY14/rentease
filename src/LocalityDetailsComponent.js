import React, { useState } from 'react';
import { Typography, Card, CardContent, Divider, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocalityDetailsComponent = () => {
  // Stub data for locality details
  const localityData = {
    name: "Bahour",
    description: "Bahour is a well-developed area known for its residential and commercial properties. It is close to major facilities like schools and hospitals.",
    images: [
      "./b1.jpg", // Use sample image paths
      "./b2.jpg",
      
    ],
    highlights: [
      "5 min to XYZ School",
      "10 min to ABC Hospital",
      "15 min to Main Market",
      "20 min to Railway Station",
    ],
    properties: {
      residential: 50,
      commercial: 30,
      pg: 20,
    },
    totalArea: 50000, // in square feet
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel settings
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % localityData.images.length);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + localityData.images.length) % localityData.images.length
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
        {localityData.name}
      </Typography>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Description and Carousel */}
        <div style={{ flex: 2 }}>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>
            {localityData.description}
          </Typography>
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay
            infiniteLoop
            selectedItem={currentIndex}
            onClickItem={() => setCurrentIndex((currentIndex + 1) % localityData.images.length)}
          >
            {localityData.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Locality ${index}`} style={{ height: '300px', width: '100%' }} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Location Highlights */}
        <div style={{ flex: 1 }}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Location Highlights</Typography>
              <Divider style={{ margin: '10px 0' }} />
              {localityData.highlights.map((highlight, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                >
                  <LocationOnIcon style={{ marginRight: '5px', color: '#3f51b5' }} />
                  {highlight}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Locality Details */}
      <div style={{ marginTop: '20px' }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Locality Details</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Typography variant="body1">
                  Residential Properties: <b>{localityData.properties.residential}</b>
                </Typography>
                <Typography variant="body1">
                  Commercial Properties: <b>{localityData.properties.commercial}</b>
                </Typography>
                <Typography variant="body1">
                  PG Properties: <b>{localityData.properties.pg}</b>
                </Typography>
              </div>
              <div>
                <Typography variant="body1">
                  Total Area Occupied: <b>{localityData.totalArea} sq ft</b>
                </Typography>
                <Typography variant="body1">
                  Total Properties: <b>{Object.values(localityData.properties).reduce((a, b) => a + b, 0)}</b>
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocalityDetailsComponent;
