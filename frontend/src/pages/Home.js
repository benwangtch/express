import React, { useState, useEffect } from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import Apartment from "../components/apartment";
import Building from "../components/building";
import House from "../components/house";

function Home() {
  const [type, setType] = useState("building");

  const handleClick = (value) => {
    if (value === type) {
      return;
    }
    setType(value);
  };

  return (
    <div>
      <MDBTabs pills justify className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleClick("building")} active={type === "building"}>
            Building
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleClick("apartment")} active={type === "apartment"}>
            Apartment
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleClick("house")} active={type === "house"}>
            House
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane open={type === "building"}>
          <Building />
        </MDBTabsPane>
        <MDBTabsPane open={type === "apartment"}>
          <Apartment />
        </MDBTabsPane>
        <MDBTabsPane open={type === "house"}>
          <House />
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}

export default Home;
