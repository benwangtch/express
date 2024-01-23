import React, { useState } from "react";
import Slider from "react-slider";

function Test() {
  const [value, setValue] = useState([25, 75]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const Thumb = (props, state) => (
    <div {...props} style={{ ...props.style, height: "25px", width: "25px" }}>
      <span style={{ fontSize: "13px" }}>{state.valueNow}</span>
    </div>
  );

  return (
    <div>
      <Slider
        className={"slider"}
        value={value}
        onChange={handleChange}
        min={0}
        max={100}
        step={1}
        renderThumb={Thumb}
      />
    </div>
  );
}

export default Test;
