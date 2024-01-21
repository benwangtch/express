import React, { Fragment ,useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import axios from "axios";
import About from "./pages/About";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Test from "./components/test";

function App() {

  return (
    <MDBContainer fluid>
      <Router>
        <Navbar />
        <br />
        <MDBContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </MDBContainer>
      </Router>
    </MDBContainer>
  );
}

export default App;
