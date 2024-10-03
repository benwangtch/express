import React, { useState } from "react";
import { MDBInput, MDBRow, MDBCol, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CustomSlider from "./customSlider";

// var houseRenderFeatures = ['price_pin','addr', 'far', 'house_age', '土地移轉總面積(坪)', '建物移轉總面積(坪)', 'total_floor', '車位移轉總面積(坪)','population_density', '主建物面積', 'n_c_1000']
// var houseRenderFeaturesEng = ['Unit Price', 'Address','Floor Area Ratio','House Age','Land Transfer Area', 'Building Transfer Area','Total Floor', 'Parking Area','Population Density', 'Main Building Area','n_c_1000']

function House() {
  const [data, setData] = useState({
    type: "house",
    address: "",
    houseAge: "",
    floorAreaRatio: "",
    landTransferArea: "",
    buildingTransferArea: "",
    filter_floorAreaRatio: [0, 0],
    filter_mainBuildingArea: [0, 0],
    filter_landTransferArea: [0, 0],
    filter_buildingTransferArea: [0, 0],
    filter_populationDensity: [0, 0],
    filter_totalFloors: [0, 0],
    filter_parkingArea: [0, 0],
    filter_n_c_1000: [0, 0],
    filter_houseAgeRange: [0, 0],
  });

  const {
    address,
    houseAge,
    floorAreaRatio,
    landTransferArea,
    buildingTransferArea,
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

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangeSlider = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  // real submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    try {
      const response = await axios.post("/process", data);
      navigate("/result", {
        state: {
          responseData: response.data,
        },
        replace: true,
      });
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <MDBInput type="number" name="houseAge" value={houseAge} label="House age" onChange={handleInputChange} />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="floorAreaRatio"
            value={floorAreaRatio}
            label="Floor Area Ratio"
            onChange={handleInputChange}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            name="landTransferArea"
            value={landTransferArea}
            label="Land Transfer Area"
            onChange={handleInputChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="buildingTransferArea"
            value={buildingTransferArea}
            label="Building Transfer Area"
            onChange={handleInputChange}
          />
        </MDBCol>
      </MDBRow>

      <hr className="hr" />


      <h4>Property Configuration</h4>

      <MDBRow className="mb-5">
        <MDBCol>
          <h6>House Age (Year)</h6>
          <CustomSlider
            value={filter_houseAgeRange}
            onChange={(value) => handleInputChangeSlider("filter_houseAgeRange", value)}
            min={0}
            max={100}
            step={1}
          />
        </MDBCol>
        <MDBCol>
          <h6>Main Building Area (m&sup2;)</h6>
          <CustomSlider
            value={filter_mainBuildingArea}
            onChange={(value) => handleInputChangeSlider("filter_mainBuildingArea", value)}
            min={0}
            max={500}
            step={1}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-5">
        <MDBCol>
          <h6>Floor Area Ratio </h6>
          <CustomSlider
            value={filter_floorAreaRatio}
            onChange={(value) => handleInputChangeSlider("filter_floorAreaRatio", value)}
            min={0}
            max={20}
            step={1}
          />
        </MDBCol>
        <MDBCol>
          <h6>Land Transfer Area (m&sup2;)</h6>
          <CustomSlider
            value={filter_landTransferArea}
            onChange={(value) => handleInputChangeSlider("filter_landTransferArea", value)}
            min={0}
            max={500}
            step={1}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-5">
        <MDBCol>
          <h6>Building Transfer Area (m&sup2;)</h6>
          <CustomSlider
            value={filter_buildingTransferArea}
            onChange={(value) => handleInputChangeSlider("filter_buildingTransferArea", value)}
            min={0}
            max={500}
            step={1}
          />
        </MDBCol>
        <MDBCol>
          <h6>Population Density</h6>
          <CustomSlider
            value={filter_populationDensity}
            onChange={(value) => handleInputChangeSlider("filter_populationDensity", value)}
            min={0}
            max={100}
            step={1}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-5">
        <MDBCol>
          <h6>Total Floor</h6>
          <CustomSlider
            value={filter_totalFloors}
            onChange={(value) => handleInputChangeSlider("filter_totalFloors", value)}
            min={0}
            max={100}
            step={1}
          />
        </MDBCol>
        <MDBCol>
          <h6>Parking Area (m&sup2;)</h6>
          <CustomSlider
            value={filter_parkingArea}
            onChange={(value) => handleInputChangeSlider("filter_parkingArea", value)}
            min={0}
            max={100}
            step={1}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-5">
        <MDBCol>
          <h6># NIMBY Facility within 1000m</h6>
          <CustomSlider
            value={filter_n_c_1000}
            onChange={(value) => handleInputChangeSlider("filter_n_c_1000", value)}
            min={0}
            max={200}
            step={1}
          />
        </MDBCol>
        <MDBCol></MDBCol>
      </MDBRow>


      <div className="d-grid gap-2 justify-content-md-end">
        <MDBBtn type="submit" disabled={loading} style={{ width: "100px", height: "ˇ30px" }}>
          {loading ? (
            <>
              <MDBSpinner size="sm" role="status" tag="span" />
              <span className="visually-hidden">Loading...</span>
            </>
          ) : (
            "Valuate"
          )}
        </MDBBtn>
      </div>
    </form>
  );
}
export default House;
