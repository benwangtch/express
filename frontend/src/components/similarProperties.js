import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { processSimiData } from "../data/processSimiData";
//
function SimilarProperties({ userInfo, similarInfo }) {
  const { header, data } = processSimiData(userInfo, similarInfo);
  const dataKey = Object.keys(data[0]);

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Similar Properties</MDBCardTitle>
        <MDBTable small responsive className="rounded-border-table" >
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
            {data.map((building, index) => (
              <tr key={index}>
                {dataKey.map((key) => (
                  <td key={key} style={{ whiteSpace: "nowrap" }}>
                    {building[key]}
                  </td>
                ))}
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
}

export default SimilarProperties;
