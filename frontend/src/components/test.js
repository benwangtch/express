import { Range } from "react-range";
import React, { useState } from "react";

const MyRangeSelector = () => {
  const [values, setValues] = useState([10, 30]); // 初始範圍

  return (
    <Range
      step={0.5}
      min={0}
      max={50}
      values={values}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            backgroundColor: "#ccc",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "16px",
            width: "16px",
            backgroundColor: "#999",
          }}
        />
      )}
    />
  );
};

export default MyRangeSelector;
