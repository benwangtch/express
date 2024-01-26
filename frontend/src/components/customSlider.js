import React from "react";
import Slider from "react-slider";

const CustomSlider = ({ value, onChange, min, max, step }) => {
  const Thumb = (props, state) => (
    <div {...props}>
      <div className="slider-thumb-bubble">{state.valueNow}</div>
    </div>
  );

  return (
    <Slider
      className="slider"
      trackClassName="slider-track"
      thumbClassName="slider-thumb"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      renderThumb={Thumb}
    />
  );
};

export default CustomSlider;
