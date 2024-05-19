// import logo from './logo.svg';
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Exchange from "./pages/Exchange";

import Scrollbars from "react-custom-scrollbars-2";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Scrollbars style={{ height: "100vh" }}>
        <Navbar name="CSFAIRTRADE" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/exchange" element={<Exchange />} />
        </Routes>
        <Footer name="CSFAIRTRADE" />
      </Scrollbars>
    </>
  );
};

export default App;
