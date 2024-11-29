import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#42389D] text-white py-4 min-h-[20vh] mt-16 w-full max-w-full flex flex-col justify-center items-center box-border">
      <div className="text-center w-full px-4">
        <h3 className="text-2xl font-semibold mb-4">School CRM</h3>
        <div className="mb-4">
          <a href="#" className="text-gray-400 hover:text-orange-300 mx-4">
            Home
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-300 mx-4">
            About Us
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-300 mx-4">
            Services
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-300 mx-4">
            Contact
          </a>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-400 hover:text-orange-300">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-300">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-300">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-300">
            <FaGithub size={24} />
          </a>
        </div>
        <div className="text-gray-500 text-sm">
          <p>&copy; 2024 School CRM. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
