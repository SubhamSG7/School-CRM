import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/Logo.png";

function Header() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const dynamicContent = {
    Student: ["Class", "Teachers", "FeeStructure", "Profile"],
    Teacher: ["Class", "Salary", "Profile"],
    Class: ["ClassAnalytics", "IncomeAnalytics", "Profile"],
  };

  const renderMenuItems = () => {
    if (role && dynamicContent[role]) {
      return dynamicContent[role].map((item, index) => (
        <li
          key={index}
          className={`text-lg cursor-pointer ${
            location.pathname.includes(item.toLowerCase())
              ? "text-black"
              : "text-gray-200 hover:text-[#030712]"
          }`}
          onClick={() => navigate(`/${item.toLowerCase()}`)}
        >
          {item}
        </li>
      ));
    } else {
      return (
        <>
          <li
            className={`text-lg cursor-pointer ${
              location.pathname.includes("class")
                ? "text-black"
                : "text-gray-200 hover:text-[#030712]"
            }`}
          >
            Class
          </li>
          <li
            className={`text-lg cursor-pointer ${
              location.pathname.includes("subjects")
                ? "text-black"
                : "text-gray-200 hover:text-[#030712]"
            }`}
          >
            Subjects
          </li>
          <li className="text-lg cursor-pointer">
            <button
              onClick={() => navigate("/signup")}
              className="text-gray-200 hover:text-[#030712]"
            >
              Sign Up
            </button>
          </li>
          <li className="text-lg cursor-pointer">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-200 hover:text-[#030712]"
            >
              Login
            </button>
          </li>
        </>
      );
    }
  };

  return (
    <header className="h-[15vh] bg-[#7c3aed] flex justify-between items-center px-8 py-4 shadow-md mb-2">
      <div className="text-white text-3xl font-semibold">
        <img src={Logo} alt="Logo" className="h-32" />
      </div>
      <nav>
        <ul className="flex space-x-8">{renderMenuItems()}</ul>
      </nav>
    </header>
  );
}

export default Header;
