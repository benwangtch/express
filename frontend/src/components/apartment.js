import React, { useState } from "react";
import { MDBInput, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

// var apartmentRenderFeatures = ['price_pin','addr', 'house_age','total_floor', '車位移轉總面積(坪)','far', '土地移轉總面積(坪)', '建物移轉總面積(坪)', 'population_density', '主建物面積', 'n_c_1000']
// var apartmentRenderFeaturesEng = ['Unit Price', 'Address', 'House Age', 'Total Floor', 'Parking Area', 'Floor Area Ratio', 'Land Transfer Area', 'Building Transfer Area', 'Population Density', 'Main Building Area','n_c_1000' ]

function Apartment() {
  const [data, setData] = useState({
    type: "apartment",
    address: "",
    houseAge: "",
    totalFloors: "",
    parkingArea: "",
    floorAreaRatio: "",
    landTransferArea: "",
    buildingTransferArea: "",
    populationDensity: "",
    mainBuildingArea: "",
    n_c_1000: "",
  });

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    navigate("/result");
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        className="mb-4"
        type="text"
        id="address"
        label="Address"
        onChange={handleInputChange}
        value={data.address}
      />
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput type="number" id="houseAge" label="House age" onChange={handleInputChange} value={data.houseAge} />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="totalFloors"
            label="Total Floors"
            onChange={handleInputChange}
            value={data.totalFloors}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="parkingArea"
            label="Parking Area"
            onChange={handleInputChange}
            value={data.parkingArea}
          />
        </MDBCol>
      </MDBRow>

      <hr className="hr" />

      <h5>Filter (Optional)</h5>
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput type="number" id="houseAge" label="House age" onChange={handleInputChange} value={data.houseAge} />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="totalFloors"
            label="Total Floors"
            onChange={handleInputChange}
            value={data.totalFloors}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="parkingArea"
            label="Parking Area"
            onChange={handleInputChange}
            value={data.parkingArea}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            id="floorAreaRatio"
            label="Floor Area Ratio"
            onChange={handleInputChange}
            value={data.floorAreaRatio}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="landTransferArea"
            label="Land Transfer Area"
            onChange={handleInputChange}
            value={data.landTransferArea}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="buildingTransferArea"
            label="Building Transfer Area"
            onChange={handleInputChange}
            value={data.buildingTransferArea}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            id="populationDensity"
            label="Population Density"
            onChange={handleInputChange}
            value={data.populationDensity}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="mainBuildingArea"
            label="Main Building Area"
            onChange={handleInputChange}
            value={data.mainBuildingArea}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput type="number" id="n_c_1000" label="n_c_1000" onChange={handleInputChange} value={data.n_c_1000} />
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="mb-4" block>
        Submit
      </MDBBtn>
    </form>
  );
}
export default Apartment;
