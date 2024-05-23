import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalContext } from "./ModalContext";

import Header from "./components/Header";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ProtectedRout from "./components/ProtectedRout";
import CreateListing from "./pages/CreateListing";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  return (
    <>
    <Router>
      <ModalContext.Provider value={{ openModal, setOpenModal, modalData, setModalData }}>
        <Header />
        <Routes>
          <Route exact path="/login" element={<Signin />} ></Route>
          <Route exact path="/signup" element={<Signup />} ></Route>

          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="/about" element={<About />} ></Route>
          
          <Route element={<ProtectedRout />} >
            <Route exact path="/profile" element={<Profile />} ></Route>
            <Route exact path="/create-listing" element={<CreateListing />} ></Route>
          </Route>
        </Routes>
      </ModalContext.Provider>
    </Router>
    </>
  );
};

export default App;
