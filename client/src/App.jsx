import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/login" element={<Signin />} ></Route>
        <Route exact path="/signup" element={<Signup />} ></Route>

        <Route exact path="/" element={<Home />} ></Route>
        <Route exact path="/about" element={<About />} ></Route>
      </Routes>
    </Router>
    </>
  );
};

export default App;
