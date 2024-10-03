import React, { useState, memo, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBCardHeader,
  MDBBtn,
} from "mdb-react-ui-kit";

import userHouse from "../imgs/userHouse.svg";
import simiHouse from "../imgs/simiHouse.svg";

const containerStyle = {
  width: "100%",
  height: "764px",
};

const libraries = ["places"];

function Map({ userAddress, similarAddress }) {
  const formatNumber = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) ? +number.toFixed(2) : value;
  };

  const userInfo = {
    address: userAddress.addr,
    location: { lat: userAddress.lat, lng: userAddress.lon },
    price: formatNumber(userAddress.price_pin),
  };

  const similarInfo = similarAddress.map((item) => ({
    address: item.addr,
    location: { lat: parseFloat(item.lat), lng: parseFloat(item.lon) },
    price: formatNumber(item.price_pin),
    bed: item["建物現況格局-房"],
    living: item["建物現況格局-廳"],
    area: formatNumber(item["主建物面積"]),
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
        <MDBCardBody style={{ paddingTop: "12px" }}>
          <MDBCardTitle className="text-center">{userInfo.address}</MDBCardTitle>
          <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
            <MarkerF
              position={mapCenter}
              icon={userIcon}
              onClick={() =>
                handleMarkerClick({ ...userInfo, addr: userInfo.address, price: `Price: ${userInfo.price}` })
              }
            />
            {similarInfo.map((simi, index) => (
              <MarkerF
                key={index}
                position={simi.location}
                icon={simiIcon}
                onClick={() => handleMarkerClick({ ...simi, addr: simi.address, price: `Price: ${simi.price}` })}
              />
            ))}

            {activeMarker && (
              <InfoWindowF
                position={activeMarker.location}
                onCloseClick={() => setActiveMarker(null)}
                style={{ maxWidth: "350px" }}
              >
                <MDBCard style={{ maxWidth: "400px" }}>
                  <MDBRow className="g-0">
                    <MDBCol md="3" center>
                      <MDBIcon fas icon="home" size={activeMarker.bed ? "5x" : "4x"} />
                    </MDBCol>
                    <MDBCol md="9">
                      <MDBCardBody style={{ padding: "0rem 0rem 0rem 0.3rem" }}>
                        <h6 style={{ marginBottom: "0.1rem" }}>{activeMarker.price}</h6>
                        <MDBCardText style={{ marginBottom: "0.2rem", display: "flex" }}>
                          {activeMarker.addr}
                        </MDBCardText>
                        {activeMarker.bed && (
                          <MDBCardText>
                            <MDBIcon fas icon="bed" style={{ paddingRight: "5px" }} />
                            {activeMarker.bed}
                            <MDBIcon fas icon="couch" style={{ paddingRight: "5px", paddingLeft: "15px" }} />
                            {activeMarker.living}
                            <MDBIcon fas icon="building" style={{ paddingRight: "5px", paddingLeft: "10px" }} />
                            {activeMarker.area} m<sup>2</sup>
                          </MDBCardText>
                        )}
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </InfoWindowF>
            )}
          </GoogleMap>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

export default memo(Map);
