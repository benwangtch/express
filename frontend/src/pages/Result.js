import React, { useEffect, useState, memo } from "react";
// import axios from "axios";

import Map from "../components/map";
import SimilarProperties from "../components/similarProperties";
import ValuationResult from "../components/valuationResult";

const userAddress = {
  type: "Building",
  address: "台中市南區福田一街60號",
  houseAge: "25",
  mainBuildingArea: "3.4",
};

const similarAddress = [
  {
    type: "Building",
    address: "台台中市南區高工路350號",
    houseAge: "15",
    mainBuildingArea: "4.5",
  },
  {
    type: "Building",
    address: "台中市南區福田三街302號",
    houseAge: "30",
    mainBuildingArea: "5.0",
  },
  {
    type: "Building",
    address: "台中市南區福田一街10號",
    houseAge: "30",
    mainBuildingArea: "5.0",
  },
];

function Result() {
  return (
    <>
      <Map userAddress={userAddress} similarAddress={similarAddress} />
      <div style={{ margin: 20 }}>ValuationResult</div>
      <ValuationResult userAddress={userAddress} />
      <div style={{ margin: 20 }}>SimilarProperties</div>
      <SimilarProperties similarAddress={similarAddress} />
    </>
  );
}

export default memo(Result);
