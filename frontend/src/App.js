import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Test from "./components/test";
import Spinner from "./components/spinner";

import "./App.css";

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
            <Route path="/spinner" element={<Spinner />} />
          </Routes>
        </MDBContainer>
      </Router>
    </MDBContainer>
  );
}

export default App;
