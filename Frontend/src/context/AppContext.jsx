import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const currencySymbol = "₹"; // or "$"

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is set in your .env

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        console.error("Failed to fetch doctors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error.message);
    }
  };

  useEffect(() => {
    fetchDoctors(); // Initial fetch on mount
  }, []);

  const value = {
  doctors,
  currencySymbol,
  fetchDoctors, // ✅ make sure it's here
};

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
