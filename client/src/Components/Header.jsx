import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/Logo.png";

function Header() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    } else {
      setRole(null);
    }
  }, []);

  const dynamicContent = {
    Student: ["Class", "Subjects", "Teachers", "FeeStructure", "Profile"],
    Teacher: ["Class", "Salary", "Profile"],
    Class: ["ClassAnalytics", "AssignTeachers", "IncomeAnalytics", "Profile"],
  };

  const renderMenuItems = () => {
    if (role && dynamicContent[role]) {
      return dynamicContent[role].map((item, index) => (
        <li
          key={index}
          className="text-lg text-gray-200 hover:text-[#030712] cursor-pointer"
          onClick={() => navigate(`/${item.toLowerCase()}`)}
        >
          {item}
        </li>
      ));
    } else {
      return (
        <>
          <li className="text-lg text-gray-200 hover:text-[#030712] cursor-pointer">
            Class
          </li>
          <li className="text-lg text-gray-200 hover:text-[#030712] cursor-pointer">
            Subjects
          </li>
          <li className="text-lg text-gray-200 hover:text-[#030712] cursor-pointer">
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign Up
            </button>
          </li>
          <li className="text-lg text-gray-200 hover:text-blue-500 cursor-pointer">
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-600"
            >
              Login
            </button>
          </li>
        </>
      );
    }
  };

  return (
    <header className="h-[15vh] bg-[#7c3aed] flex justify-between items-center px-8 py-4 shadow-md">
      <div className="text-white text-3xl font-semibold">
        <img src={Logo} alt="Logo" className="h-48" />
      </div>
      <nav>
        <ul className="flex space-x-8">{renderMenuItems()}</ul>
      </nav>
    </header>
  );
}

export default Header;
