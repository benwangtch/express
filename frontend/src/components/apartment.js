import React, { useState } from "react";
import { MDBInput, MDBRow, MDBCol, MDBBtn,MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Slider from "react-slider";
import axios from "axios";

// var apartmentRenderFeatures = ['price_pin','addr', 'house_age','total_floor', '車位移轉總面積(坪)','far', '土地移轉總面積(坪)', '建物移轉總面積(坪)', 'population_density', '主建物面積', 'n_c_1000']
// var apartmentRenderFeaturesEng = ['Unit Price', 'Address', 'House Age', 'Total Floor', 'Parking Area', 'Floor Area Ratio', 'Land Transfer Area', 'Building Transfer Area', 'Population Density', 'Main Building Area','n_c_1000' ]

function Apartment() {
  const [data, setData] = useState({
    type: "apartment",
    address: "",
    houseAge: "",
    totalFloors: "",
    parkingArea: "",
    filter_totalFloors: "",
    filter_houseAgeRange: [0, 100],
    filter_parkingArea: "",
    filter_floorAreaRatio: "",
    filter_landTransferArea: "",
    filter_buildingTransferArea: "",
    filter_populationDensity: "",
    filter_mainBuildingArea: "",
    filter_n_c_1000: "",
  });

  const {
    address,
    houseAge,
    totalFloors,
    parkingArea,
    filter_totalFloors,
    filter_houseAgeRange,
    filter_parkingArea,
    filter_floorAreaRatio,
    filter_landTransferArea,
    filter_buildingTransferArea,
    filter_populationDensity,
    filter_mainBuildingArea,
    filter_n_c_1000,
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

  const handleInputChangeSlider = (e) => {
    setData({
      ...data,
      filter_houseAgeRange: e,
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
        label="Address"
        onChange={handleInputChange}
        value={address}
      />
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput type="number" name="houseAge" label="House age" onChange={handleInputChange} value={houseAge} />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="totalFloors"
            label="Total Floors"
            onChange={handleInputChange}
            value={totalFloors}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="parkingArea"
            label="Parking Area"
            onChange={handleInputChange}
            value={parkingArea}
          />
        </MDBCol>
      </MDBRow>

      <hr className="hr" />

      <h5>Filter (Optional)</h5>

      <MDBRow className="mb-4">
        <h6>House Age</h6>
        <br />
        <Slider
          className="slider"
          trackClassName="slider-track"
          thumbClassName="slider-thumb"
          value={filter_houseAgeRange}
          onChange={handleInputChangeSlider}
          min={0}
          max={100}
          step={1}
          renderThumb={Thumb}
        />
      </MDBRow>
      <br />
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_totalFloors"
            label="Total Floors"
            onChange={handleInputChange}
            value={filter_totalFloors}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="parkingArea"
            label="Parking Area"
            onChange={handleInputChange}
            value={filter_parkingArea}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_floorAreaRatio"
            label="Floor Area Ratio"
            onChange={handleInputChange}
            value={filter_floorAreaRatio}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_landTransferArea"
            label="Land Transfer Area"
            onChange={handleInputChange}
            value={filter_landTransferArea}
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
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_populationDensity"
            label="Population Density"
            onChange={handleInputChange}
            value={filter_populationDensity}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_mainBuildingArea"
            label="Main Building Area"
            onChange={handleInputChange}
            value={filter_mainBuildingArea}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="number"
            name="filter_n_c_1000"
            label="n_c_1000"
            onChange={handleInputChange}
            value={filter_n_c_1000}
          />
        </MDBCol>
      </MDBRow>

      <div className="d-grid gap-2 justify-content-md-end">
        <MDBBtn type="submit" disabled={loading} style={{ width: "100px", height: "ˇ30px" }} color="dark">
          {loading ? (
            <>
              <MDBSpinner size="sm" role="status" tag="span" />
              <span className="visually-hidden">Loading...</span>
            </>
          ) : (
            "Submit"
          )}
        </MDBBtn>
      </div>
    </form>
  );
}
export default Apartment;
