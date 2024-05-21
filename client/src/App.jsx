import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ProtectedRout from "./components/ProtectedRout";
import { ModalContext } from "./ModalContext";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
    <Router>
      <ModalContext.Provider value={{ openModal, setOpenModal }}>
        <Header />
        <Routes>
          <Route exact path="/login" element={<Signin />} ></Route>
          <Route exact path="/signup" element={<Signup />} ></Route>

          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="/about" element={<About />} ></Route>
          
          <Route element={<ProtectedRout />} >
            <Route exact path="/profile" element={<Profile />} ></Route>
          </Route>
        </Routes>
      </ModalContext.Provider>
    </Router>
    </>
  );
};

export default App;
