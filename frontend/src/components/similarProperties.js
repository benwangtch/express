import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function SimilarProperties({ similarAddress }) {
  const header = Object.keys(similarAddress[0]);
  const buildings = similarAddress;

  return (
    <MDBTable responsive>
      <MDBTableHead light>
        <tr>
          {header.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {buildings.map((building, index) => (
          <tr key={index}>
            <td>{building.type}</td>
            <td>{building.address}</td>
            <td>{building.houseAge}</td>
            <td>{building.mainBuildingArea}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}

export default SimilarProperties;
