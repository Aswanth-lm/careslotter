import React from "react";
import { assets } from "../assets/assets";
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Social Media Icons

const Footer = () => {
  return (
    <footer className="relative px-6 md:px-10 mt-40 bg-transparent text-gray-300">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 blur-3xl opacity-20"></div>

      {/* Main Footer Content */}
      <div className="relative flex flex-col md:flex-row justify-between gap-10 my-10">
        {/* Left Section */}
        <div className="flex-1">
          <img
            className="mb-5 w-40"
            src={assets?.logo || "/fallback-logo.png"} // ✅ Handle missing logo
            alt="CareSlotter Logo"
          />
          <p className="w-full md:w-2/3 text-gray-500 leading-6">
            CareSlotter is a registered startup empaneled with 10,000+ Doctors,
            500+ Hospitals, and has impacted over 2 million patients.
          </p>
          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <FaFacebook className="text-pink-500 text-2xl hover:scale-110 transition-all cursor-pointer" />
            <FaTwitter className="text-pink-500 text-2xl hover:scale-110 transition-all cursor-pointer" />
            <FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition-all cursor-pointer" />
          </div>
        </div>

        {/* Center Section */}
        <nav>
          <p className="text-lg font-medium mb-5 text-black">Company</p>
          <ul className="flex flex-col gap-2">
            {["Home", "About Us", "Contact Us", "Services", "Privacy Policy"].map((item) => (
              <li
                key={item}
                className="hover:text-black hover:translate-x-2 transition-all duration-300 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <nav>
          <p className="text-lg font-medium mb-5 text-black">Get in Touch</p>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 hover:text-black transition-all hover:scale-105 cursor-pointer">
              <FaPhoneAlt className="text-pink-500" />
              +91 785427819
            </li>
            <li className="flex items-center gap-2 hover:text-black transition-all hover:scale-105 cursor-pointer">
              <FaEnvelope className="text-pink-500" />
              CareSlotter@gmail.com
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <hr className="border-gray-600" />
      <p className="py-5 text-sm text-center text-gray-400">
        © {new Date().getFullYear()} CareSlotter. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
