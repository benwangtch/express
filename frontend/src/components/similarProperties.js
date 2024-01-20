import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function SimilarProperties({ similarAddress }) {
  // const [data, setData] = useState({
  //   type: "Building",
  //   address: "台中市南區福田一街60號",
  //   houseAge: "25",
  //   mainBuildingArea: "3.4",
  // });

  const header = Object.keys(similarAddress[0]);

  // const dataValues = Object.values(data);

  const buildings = similarAddress;

  return (
    <MDBTable>
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
