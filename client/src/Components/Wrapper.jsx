import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Wrapper() {
  return (
    <div className="w-screen h-screen">
      <Header className="h-[15vh]" />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Wrapper;
