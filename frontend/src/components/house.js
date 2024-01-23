import React, { useState } from "react";
import { MDBInput, MDBRow, MDBCol, MDBBtn, MDBRange } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

// var houseRenderFeatures = ['price_pin','addr', 'far', 'house_age', '土地移轉總面積(坪)', '建物移轉總面積(坪)', 'total_floor', '車位移轉總面積(坪)','population_density', '主建物面積', 'n_c_1000']
// var houseRenderFeaturesEng = ['Unit Price', 'Address','Floor Area Ratio','House Age','Land Transfer Area', 'Building Transfer Area','Total Floor', 'Parking Area','Population Density', 'Main Building Area','n_c_1000']

function House() {
  const [data, setData] = useState({
    type: "house",
    address: "",
    houseAge: "",
    totalFloors: "",
    parkingArea: "",
    filter_totalFloors: "",
    filter_floorAreaRatio: "",
    filter_mainBuildingArea: "",
    filter_landTransferArea: "",
    filter_buildingTransferArea: "",
    filter_populationDensity: "",
    filter_parkingArea: "",
    filter_n_c_1000: "",
    filter_houseAgeRange: [0, 100],
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
    navigate("/result");
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput className="mb-4" type="text" id="address" label="Address" onChange={handleInputChange} />
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput type="number" id="houseAge" label="House age" onChange={handleInputChange} />
        </MDBCol>
        <MDBCol>
          <MDBInput type="number" id="floorAreaRatio" label="Floor Area Ratio" onChange={handleInputChange} />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput type="number" id="landTransferArea" label="Land Transfer Area" onChange={handleInputChange} />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="buildingTransferArea"
            label="Building Transfer Area"
            onChange={handleInputChange}
          />
        </MDBCol>
      </MDBRow>

      <hr className="hr" />

      <h5>Filter</h5>

      <div className="mb-4">
        <MDBRange defaultValue={0} min="0" max="50" step="0.5" id="houseage" label="House Age" />
      </div>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput type="number" id="mainBuildingArea" label="Main Building Area" onChange={handleInputChange} />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            id="floorAreaRatio"
            label="Floor Area Ratio"
            onChange={handleInputChange}
            value={data.floorAreaRatio}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
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
        <MDBCol>
          <MDBInput
            type="number"
            id="populationDensity"
            label="Population Density"
            onChange={handleInputChange}
            value={data.populationDensity}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            id="totalFloors"
            label="Total Floor"
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
export default House;
