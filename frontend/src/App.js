import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";

import About from "./pages/About";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import Result from "./pages/Result";

function App() {
  return (
    <MDBContainer fluid>
      <Router>
        <Navbar />
        <br />
        <MDBContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </MDBContainer>
      </Router>
    </MDBContainer>
  );
}

export default App;
