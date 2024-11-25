import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Wrapper() {
  return (
    <div className="w-[100%]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Wrapper;
