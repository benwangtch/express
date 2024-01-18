import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function ValuationResult({ onDataLoad }) {
  // const [data, setData] = useState({
  //   type: "Building",
  //   address: "台中市南區福田一街60號",
  //   houseAge: "25",
  //   mainBuildingArea: "3.4",
  // });

  const header = ["Type", "Address", "House Age", "Main Building Area"];

  // const dataValues = Object.values(data);
  const dataValues = ["Building", "台中市南區福田一街60號", "25", "3.4"];

  const test = [
    {
      type: "Building",
      address: "台中市南區福田一街60號",
      houseAge: "25",
      mainBuildingArea: "3.4",
    },
  ];

  useEffect(() => {
    if (onDataLoad) {
      onDataLoad(test);
    }
  }, [onDataLoad, test]);

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
        <tr>
          {dataValues.map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}

export default ValuationResult;
