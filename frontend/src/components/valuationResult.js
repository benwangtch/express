import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { processValData } from "../data/processValData";

function ValuationResult({ userInfo }) {
  const { header, data } = processValData(userInfo);

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Valuation Result</MDBCardTitle>
        <MDBTable small  responsive className="rounded-border-table">
          <MDBTableHead light>
            <tr>
              {header.map((title, index) => (
                <th key={index} style={{ whiteSpace: "nowrap" }}>
                  {title}
                </th>
              ))}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              {data.map((value, index) => (
                <td key={index} style={{ whiteSpace: "nowrap" }}>
                  {value}
                </td>
              ))}
            </tr>
          </MDBTableBody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ValuationResult;
