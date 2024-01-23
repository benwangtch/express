import React, { useState, memo, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, OverlayView } from "@react-google-maps/api";
import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";

import userHouse from "../imgs/userHouse.svg";
import simiHouse from "../imgs/simiHouse.svg";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const libraries = ["places"];

function Map({ userAddress, similarAddress }) {
  const userInfo = {
    address: userAddress.addr,
    location: { lat: userAddress.lat, lng: userAddress.lon },
    price: userAddress.price_pin,
  };

  const similarInfo = similarAddress.map((item) => ({
    address: item.addr,
    location: { lat: parseFloat(item.lat), lng: parseFloat(item.lon) },
    price: item.price_pin,
    bed: item["建物現況格局-房"],
    living: item["建物現況格局-廳"],
    area: item["主建物面積"],
  }));

  const [mapCenter, setMapCenter] = useState(userInfo.location);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    if (marker === activeMarker) return;
    setActiveMarker(marker);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [userIcon, setUserIcon] = useState({
    url: userHouse,
  });
  const [simiIcon, setSimiIcon] = useState({
    url: simiHouse,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle className="text-center">{userInfo.address}</MDBCardTitle>
          <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
            <MarkerF
              position={mapCenter}
              icon={userIcon}
              onClick={() =>
                handleMarkerClick({ ...userInfo, title: userInfo.address, description: `Price: ${userInfo.price}` })
              }
            />
            {similarInfo.map((simi, index) => (
              <MarkerF
                key={index}
                position={simi.location}
                icon={simiIcon}
                onClick={() => handleMarkerClick({ ...simi, title: simi.address, description: `Price: ${simi.price}` })}
              />
            ))}

            {activeMarker && (
              <InfoWindowF position={activeMarker.location} onCloseClick={() => setActiveMarker(null)}>
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
