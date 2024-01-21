import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function ValuationResult({ userAddress }) {
  const header = Object.keys(userAddress);
  const dataValues = Object.values(userAddress);

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
        <tr>
          {dataValues.map((value, index) => (
            <td key={index} style={{ whiteSpace: "nowrap" }}>
              {value}
            </td>
          ))}
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}

export default ValuationResult;
