import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Map from "../components/map";
import SimilarProperties from "../components/similarProperties";
import ValuationResult from "../components/valuationResult";

const userAddress = {
  type: "Building",
  address: "台中市南區福田一街60號",
  houseAge: "25",
  mainBuildingArea: "3.4",
  floorAreaRatio: "2.0",
  landTransferArea: "4.0",
  buildingTransferArea: "3.0",
};

const similarAddress = [
  {
    type: "Building",
    address: "台中市南區高工路350號",
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
  {
    type: "Building",
    address: "台中市南區福田一街120號",
    houseAge: "30",
    mainBuildingArea: "5.0",
  },
];

function Result() {
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/test");
  //       setData(response.data.message);
  //       console.log(JSON.stringify(response.data));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <MDBRow>
        <MDBCol size={"md-6"}>
          <Map userAddress={userAddress} similarAddress={similarAddress} />
        </MDBCol>
        <MDBCol size={"md-6"}>
          <div style={{ width: "100%" }}>
            <div style={{ margin: 20 }}>ValuationResult</div>
            <ValuationResult userAddress={userAddress} />
            <div style={{ margin: 20 }}>SimilarProperties</div>
            <SimilarProperties similarAddress={similarAddress} />
          </div>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default memo(Result);
