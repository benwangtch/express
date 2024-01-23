import React, { useState } from "react";
import { MDBInput, MDBRow, MDBCol, MDBBtn, MDBRange } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Slider from "react-slider";
import axios from "axios";
// var buildingRenderFeatures = ['price_pin','addr', 'house_age','主建物面積','far', '土地移轉總面積(坪)', '建物移轉總面積(坪)', 'population_density','total_floor', '車位移轉總面積(坪)', 'n_c_1000']
// var buildingRenderFeaturesEng  = ['Unit Price', 'Address', 'House Age','Main Building Area','Floor Area Ratio', 'Land Transfer Area', 'Building Transfer Area','Population Density','Total Floor', 'Parking Area','n_c_1000']

function Building() {
  const [data, setData] = useState({
    type: "building",
    address: "",
    houseAge: "",
    mainBuildingArea: "",
    filter_floorAreaRatio: "",
    filter_mainBuildingArea: "",
    filter_landTransferArea: "",
    filter_buildingTransferArea: "",
    filter_populationDensity: "",
    filter_totalFloors: "",
    filter_parkingArea: "",
    filter_n_c_1000: "",
    filter_houseAgeRange: [0, 100],
  });

  const {
    address,
    houseAge,
    mainBuildingArea,
    filter_floorAreaRatio,
    filter_mainBuildingArea,
    filter_landTransferArea,
    filter_buildingTransferArea,
    filter_populationDensity,
    filter_totalFloors,
    filter_parkingArea,
    filter_n_c_1000,
    filter_houseAgeRange,
  } = data;

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // const handleChange = (newValue) => {
  //   setHouseAgeRange(newValue);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await axios.post("/process", data);
      console.log("API Response:", response.data);
      // Do something with the response if needed
    } catch (error) {
      console.error("Error sending data:", error);
    }
    navigate("/result", { replace: true });
  };

  const Thumb = (props, state) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: "25px",
        width: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "12px" }}>{state.valueNow}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        className="mb-4"
        type="text"
        name="address"
        value={address}
        label="Address"
        onChange={handleInputChange}
      />
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput type="number" name="houseAge" label="House age" value={houseAge} onChange={handleInputChange} />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="mainBuildingArea"
            label="Main Building Area"
            value={mainBuildingArea}
            onChange={handleInputChange}
          />
        </MDBCol>
      </MDBRow>

      <hr className="hr" />

      <h5>Filter</h5>

      <div className="mb-4">
        <h6>House Age</h6>
        <Slider
          className={"slider"}
          name="filter_houseAgeRange"
          value={filter_houseAgeRange}
          onChange={handleInputChange}
          min={0}
          max={100}
          step={1}
          renderThumb={Thumb}
        />
      </div>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_mainBuildingArea"
            label="Main Building Area"
            value={filter_mainBuildingArea}
            onChange={handleInputChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_floorAreaRatio"
            label="Floor Area Ratio"
            value={filter_floorAreaRatio}
            onChange={handleInputChange}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_landTransferArea"
            label="Land Transfer Area"
            value={filter_landTransferArea}
            onChange={handleInputChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_buildingTransferArea"
            label="Building Transfer Area"
            onChange={handleInputChange}
            value={filter_buildingTransferArea}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_populationDensity"
            label="Population Density"
            onChange={handleInputChange}
            value={filter_populationDensity}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_totalFloors"
            label="Total Floor"
            onChange={handleInputChange}
            value={filter_totalFloors}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            label="Parking Area"
            name="filter_parkingArea"
            onChange={handleInputChange}
            value={filter_parkingArea}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_n_c_1000"
            label="n_c_1000"
            value={filter_n_c_1000}
            onChange={handleInputChange}
          />
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="mb-4" block>
        Submit
      </MDBBtn>
    </form>
  );
}
export default Building;
