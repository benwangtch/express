import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
//
function Text() {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Textual Explanation</MDBCardTitle>
        <MDBCardText style={{ height: "140px", overflowY: "auto" }}>
        The predicted price for the apartment at 106台北市大安區建國南路一段286巷26號 is NTD 1,038,665. This value is influenced by factors such as the property being 15 years old, a total of 5 floors, and no parking area.
          Looking at five similar properties, we observe:
          <ul>
            <li>Two properties at 仁愛路三段, which are 25.71 years old with 6 floors and no parking area, have lower prices, each around NTD 835,108. The older age likely contributes to the lower valuation.</li>
            <li>A nearby apartment at 建國南路一段286巷31號 is 14.31 years old, has 7 floors, and includes 1.3 parking spaces, with a price around NTD 1,024,225. The slightly newer age and additional parking may explain the close pricing.</li>
            <li>Another property at 建國南路一段270巷 is 12.06 years old with 7 floors and no parking, priced higher at NTD 1,102,673, likely due to its newer age.</li>
          </ul>
          Thus, the predicted price reflects a balance of age, number of floors, and parking availability, closely aligning with similar properties in the area.
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Text;
