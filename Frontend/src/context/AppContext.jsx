import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const currencySymbol = "₹"; // or "$"

  // Base URL for all API calls
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ==============================
  // FETCH DOCTORS
  // ==============================
  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) setDoctors(data.doctors);
      else console.error("Failed to fetch doctors:", data.message);
    } catch (err) {
      console.error("Error fetching doctors:", err.message);
    }
  };

  // ==============================
  // FETCH USER PROFILE
  // ==============================
  const fetchUserProfile = async (token) => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUser(data.user);
      else console.error("Failed to fetch user profile:", data.message);
    } catch (err) {
      console.error("Error fetching user profile:", err.message);
    }
  };

  // ==============================
  // FETCH USER APPOINTMENTS
  // ==============================
  const fetchAppointments = async (token) => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setAppointments(data.appointments);
      else console.error("Failed to fetch appointments:", data.message);
    } catch (err) {
      console.error("Error fetching appointments:", err.message);
    }
  };

  // ==============================
  // FETCH SERVICES
  // ==============================
  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/service`);
      if (data.success) setServices(data.services);
      else console.error("Failed to fetch services:", data.message);
    } catch (err) {
      console.error("Error fetching services:", err.message);
    }
  };

  // ==============================
  // FETCH JOBS
  // ==============================
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/jobs`);
      if (data.success) setJobs(data.jobs);
      else console.error("Failed to fetch jobs:", data.message);
    } catch (err) {
      console.error("Error fetching jobs:", err.message);
    }
  };

  // ==============================
  // EFFECTS ON MOUNT
  // ==============================
  useEffect(() => {
    fetchDoctors();
    fetchServices();
    fetchJobs();
    // Optional: fetch user if token stored in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
      fetchAppointments(token);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        doctors,
        user,
        appointments,
        services,
        jobs,
        currencySymbol,
        fetchDoctors,
        fetchUserProfile,
        fetchAppointments,
        fetchServices,
        fetchJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
