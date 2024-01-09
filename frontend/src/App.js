import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfigArea from './components/ConfigArea';
import SimilarDatasArea from './components/SimilarDatasArea';
import GoogleMapsArea from './components/GoogleMapsArea';
import './App.css';

function App() {
  const [propertyType, setPropertyType] = useState('');
  const [houseAge, setHouseAge] = useState('');
  const [address, setAddress] = useState('');
  const [similarData, setSimilarData] = useState([]);
  const [googleMapData, setGoogleMapData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/similar-data', {
        propertyType,
        houseAge,
        address,
      });
      setSimilarData(response.data);

      const googleMapResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDPVlYLEiE2KMAwFWZG_zFUsj8EisyxwWA`
      );
      setGoogleMapData(googleMapResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="left-section">
        <ConfigArea
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          houseAge={houseAge}
          setHouseAge={setHouseAge}
          address={address}
          setAddress={setAddress}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="right-section">
        <div className="top-right-section">
          <GoogleMapsArea googleMapData={googleMapData} />
        </div>
        <div className="bottom-right-section">
          <SimilarDatasArea similarData={similarData} />
        </div>
      </div>
    </div>
  );
}

export default App;

