import React, { useEffect, useState, memo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "600px",
};

// const uesrAddress = {
//   type: "Building",
//   address: "台中市南區福田一街60號",
//   houseAge: "25",
//   mainBuildingArea: "3.4",
// };

// const similarAddress = [
//   {
//     type: "Building",
//     address: "台台中市南區高工路350號",
//     houseAge: "15",
//     mainBuildingArea: "4.5",
//   },
//   {
//     type: "Building",
//     address: "台中市南區福田三街302號",
//     houseAge: "30",
//     mainBuildingArea: "5.0",
//   },
//   {
//     type: "Building",
//     address: "台中市南區福田一街10號",
//     houseAge: "30",
//     mainBuildingArea: "5.0",
//   },
// ];

const libraries = ["places"];

function Map({ userAddress, similarAddress }) {
  const [user, setUser] = useState({ lat: 0, lng: 0 });
  const [simi, setSimi] = useState([]);

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
            <MarkerF position={user} label={"User"} />
            {simi.map((marker, index) => (
              <MarkerF key={index} position={marker} label={"Maker"} />
            ))}
          </GoogleMap>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

export default memo(Map);
