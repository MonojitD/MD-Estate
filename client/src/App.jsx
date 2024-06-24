import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalContext } from "./ModalContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ProtectedRout from "./components/ProtectedRout";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

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
          <Route exact path="/listing/:listingId" element={<Listing />} ></Route>
          <Route exact path="/search" element={<Search />} ></Route>
          
          <Route element={<ProtectedRout />} >
            <Route exact path="/profile" element={<Profile />} ></Route>
            <Route exact path="/create-listing" element={<CreateListing />} ></Route>
            <Route exact path="/update-listing/:listingId" element={<UpdateListing />} ></Route>
          </Route>
        </Routes>
        <Footer />
      </ModalContext.Provider>
    </Router>
    </>
  );
};

export default App;
