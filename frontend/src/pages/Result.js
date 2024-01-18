import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";

import ValuationResult from "../components/valuationResult";
import SimilarProperties from "../components/similarProperties";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 23.7,
  lng: 121.0794,
};

const libraries = ["places"];

function Result() {
  const [mapCenter, setMapCenter] = useState(center);

  const [data, setData] = useState({
    type: "Building",
    address: "台中市南區福田一街60號",
    houseAge: "25",
    mainBuildingArea: "3.4",
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    const address = data.address;

    if (address) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${
          process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setMapCenter(data.results[0].geometry.location);
          }
        });
    }
  }, []);

  const [markers, setMarkers] = useState([]);

  const handleDataLoad = (newData) => {
    newData.forEach((property) => {
      fetchGeocode(property.address, (location) => {
        setMarkers((prevMarkers) => [...prevMarkers, { lat: location.lat, lng: location.lng }]);
      });
    });
  };

  const fetchGeocode = (address, callback) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          callback(data.results[0].geometry.location);
        }
      });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle className="text-center">{data.address}</MDBCardTitle>
          <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
            {markers.map((marker, index) => (
              <MarkerF key={index} position={marker} />
            ))}
          </GoogleMap>
        </MDBCardBody>
      </MDBCard>
      <div style={{ margin: 10 }}>
        <h4>Valuation Result</h4>
      </div>
      <ValuationResult onDataLoad={handleDataLoad} />
      <div style={{ margin: 10 }}>
        <h4>Similar Properties</h4>
      </div>
      <SimilarProperties onDataLoad={handleDataLoad} />
    </>
  );
}

export default Result;
