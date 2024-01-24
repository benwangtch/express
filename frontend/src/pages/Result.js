import React, { useEffect, useState, memo } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Map from "../components/map";
import SimilarProperties from "../components/similarProperties";
import ValuationResult from "../components/valuationResult";
import { userInfo, similarInfo } from "../data/output";

function Result() {
  const location = useLocation();
  const { responseData } = location.state || {};
  const userInfo = responseData?.output || {};
  const similarInfo = JSON.parse(responseData?.groupData || {});
  
  // const userInfo = data.output;
  // const similarInfo = JSON.parse(data.groupData);

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
