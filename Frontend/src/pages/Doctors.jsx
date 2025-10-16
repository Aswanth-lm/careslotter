import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  FaStethoscope,
  FaHeartbeat,
  FaBaby,
  FaBrain,
  FaTooth,
  FaUserMd,
  FaStar,
  FaClock,
  FaMoneyBillAlt,
} from "react-icons/fa";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors, fetchDoctors } = useContext(AppContext); // ✅ make sure fetchDoctors is available
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetchDoctors(); // ✅ always fetch fresh data on mount
  }, [speciality]);

  useEffect(() => {
    const applyFilter = () => {
      let filtered = doctors.filter((doc) => doc.available); // ✅ only show available
      if (speciality) {
        filtered = filtered.filter((doc) => doc.speciality === speciality);
      }
      setFilterDoc(filtered);
    };
    applyFilter();
  }, [doctors, speciality]);

  const specialties = [
    { name: "General Physician", icon: <FaUserMd className="inline-block mr-2" /> },
    { name: "Gynecologist", icon: <FaHeartbeat className="inline-block mr-2" /> },
    { name: "Dermatologist", icon: <FaStethoscope className="inline-block mr-2" /> },
    { name: "Pediatricians", icon: <FaBaby className="inline-block mr-2" /> },
    { name: "Neurologist", icon: <FaBrain className="inline-block mr-2" /> },
    { name: "Gastroenterologist", icon: <FaTooth className="inline-block mr-2" /> },
  ];

  return (
    <div className="py-12 px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="text-center text-3xl font-bold text-gray-800">
        Find a <span className="text-red-600">Specialist</span>
      </div>
      <p className="text-center text-gray-600 mt-2">
        Browse and book an appointment with top-rated doctors.
      </p>

      {/* Filter & Doctors Section */}
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        {/* Filter Section */}
        <div className="w-full md:w-1/4">
          <button
            className={`w-full py-2 border rounded-lg text-sm font-medium sm:hidden ${showFilter ? "bg-pink-700 text-white" : "bg-gray-100"}`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>

          <div className={`mt-4 flex-col gap-4 text-sm ${showFilter ? "flex" : "hidden sm:flex"}`}>
            {specialties.map((spec) => (
              <button
                key={spec.name}
                onClick={() => navigate(speciality === spec.name ? "/doctors" : `/doctors/${spec.name}`)}
                aria-label={`View ${spec.name} doctors`}
                className={`w-full py-2 px-4 border border-gray-300 rounded-lg text-left transition-all
                  ${speciality === spec.name ? "bg-blue-100 text-pink-600 font-semibold shadow-md" : "hover:bg-gray-100"}`}
              >
                {spec.icon} {spec.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.length === 0 ? (
            <p className="text-gray-500">No doctors available in this category.</p>
          ) : (
            filterDoc.map((doctor, index) => (
              <motion.div
                key={index}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-lg transition-all"
              >
                <img className="w-full h-64 object-cover" src={doctor.image} alt={`Dr. ${doctor.name}`} />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Available</span>
                  </div>
                  <p className="text-gray-900 text-lg font-semibold">{doctor.name}</p>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaStar className="text-yellow-500" />
                      <span>{doctor.rating} (1k+ reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="text-pink-800" />
                      <span>{doctor.experience} years of experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMoneyBillAlt className="text-green-500" />
                      <span>₹{doctor.fee} consultation fee</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                    className="mt-4 w-full py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-700 transition-all duration-300"
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
