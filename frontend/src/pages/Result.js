import React, { useEffect, useState, memo } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
// import axios from "axios";

import Map from "../components/map";
import SimilarProperties from "../components/similarProperties";
import ValuationResult from "../components/valuationResult";
import { userInfo, similarInfo } from "../data/output";

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
          <Map userAddress={userInfo} similarAddress={similarInfo} />
        </MDBCol>
        <MDBCol size={"md-6"}>
          <ValuationResult userInfo={userInfo} />
          <br />
          <SimilarProperties userInfo={userInfo} similarInfo={similarInfo} />
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Result;
