import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function Spinner() {
  return (
    <>
      <div className="text-center">
        <MDBSpinner role="status" style={{ width: "5rem", height: "5rem" }}>
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    </>
  );
}
