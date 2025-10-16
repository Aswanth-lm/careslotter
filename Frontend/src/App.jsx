import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyAppointment from "./pages/MyAppointment";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Service from "./pages/Service"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Job from "./pages/Job";
import ApplyNow from "./pages/ApplyNow";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"; // Tailwind styles

function App() {
  return (
    <BrowserRouter>
      <div className="mx-4 sm:mx-[10%] flex flex-col min-h-screen">
        <ToastContainer />
        
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/service" element={<Service />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            
            {/* Protected Routes */}
            <Route
              path="/my-appointments"
              element={
                <ProtectedRoute>
                  <MyAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-profile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment/:docId"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />

            <Route path="/jobs" element={<Job />} />
            <Route path="/apply/:id" element={<ApplyNow />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
