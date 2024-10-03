import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";

function About() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "250vh" }}>
      <MDBCard>
        <MDBCardImage
          src="https://scontent.ftpe4-2.fna.fbcdn.net/v/t31.18172-8/1402298_432617953505891_219874256_o.jpg?_nc_cat=102&ccb=1-7&_nc_sid=4dc865&_nc_ohc=9tNbX72LU0YAX_7KAOk&_nc_ht=scontent.ftpe4-2.fna&oh=00_AfBZgI2SkiW3pvLbR4Gw08iTOrCSuwuFNLa0ivkBtd7-gw&oe=65CF683D"
          position="top"
          className="figure-img img-fluid rounded shadow-3 mb-3"
          style={{ width: "100%", height: "auto" }}
          alt="..."
        />
        <MDBCardBody>
          <MDBCardTitle>This is the about page</MDBCardTitle>
          <MDBCardText>Vision 1.0</MDBCardText>
          <MDBBtn href="/">Back</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default About;
