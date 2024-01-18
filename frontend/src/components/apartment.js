import React, { useState } from "react";
import { MDBInput, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Apartment() {
  const [data, setData] = useState({
    type: "apartment",
    address: "",
    houseAge: "",
    totalFloors: "",
    parkingArea: "",
  });

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/", { replace: true, state: { address: data.address } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput className="mb-4" type="text" id="address" label="Address" onChange={handleInputChange} />
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput type="number" id="houseAge" label="House age" onChange={handleInputChange} />
        </MDBCol>
        <MDBCol>
          <MDBInput type="number" id="totalFloors" label="Total Floors" onChange={handleInputChange} />
        </MDBCol>
        <MDBCol>
          <MDBInput type="number" id="parkingArea" label="Parking Area" onChange={handleInputChange} />
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="mb-4" block>
        Submit
      </MDBBtn>
    </form>
  );
}
export default Apartment;
