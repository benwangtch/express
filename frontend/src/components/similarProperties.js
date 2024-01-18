import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function SimilarProperties({ onDataLoad }) {
  // const [data, setData] = useState({
  //   type: "Building",
  //   address: "台中市南區福田一街60號",
  //   houseAge: "25",
  //   mainBuildingArea: "3.4",
  // });

  const header = ["Type", "Address", "House Age", "Main Building Area"];

  // const dataValues = Object.values(data);

  const buildings = [
    {
      type: "Building",
      address: "台中市西區民生路100號",
      houseAge: "15",
      mainBuildingArea: "4.5",
    },
    {
      type: "Building",
      address: "台中市北區崇德路200號",
      houseAge: "30",
      mainBuildingArea: "5.0",
    },
  ];

  useEffect(() => {
    if (onDataLoad) {
      onDataLoad(buildings);
    }
  }, [onDataLoad, buildings]);

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
