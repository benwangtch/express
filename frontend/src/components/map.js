import React, { useEffect, useState, memo } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";

import userHouse from "../imgs/userHouse.svg";
import simiHouse from "../imgs/simiHouse.svg";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const libraries = ["places"];

function Map({ userAddress, similarAddress }) {
  const [user, setUser] = useState({ lat: 0, lng: 0 });
  const [simi, setSimi] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  const userIcon = {
    url: userHouse,
  };

  const simiIcon = {
    url: simiHouse,
  };

  const geocodeAddress = async (address) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userLocation = await geocodeAddress(userAddress.address);
      setUser(userLocation);

      const similarLocations = await Promise.all(similarAddress.map((address) => geocodeAddress(address.address)));
      setSimi(similarLocations);
    };
    fetchData();
  }, []);

  const handleMarkerClick = (marker) => {
    if (marker === activeMarker) return;
    setActiveMarker(marker);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle className="text-center">{userAddress.address}</MDBCardTitle>
          <GoogleMap mapContainerStyle={containerStyle} center={user} zoom={15}>
            <MarkerF
              position={user}
              icon={userIcon}
              onClick={() => handleMarkerClick({ ...user, title: "User Location", description: "User Content" })}
            />
            {simi.map((marker, index) => (
              <MarkerF
                key={index}
                position={marker}
                icon={simiIcon}
                onClick={() =>
                  handleMarkerClick({ ...marker, title: "Marker Loaction", description: "Marker Content" })
                }
              />
            ))}

            {activeMarker && (
              <InfoWindowF position={activeMarker} onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <h5>{activeMarker.title}</h5>
                  <p>{activeMarker.description}</p>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

export default memo(Map);
