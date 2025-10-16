import express from "express";
import {
  addDoctor,
  allDoctors,
  loginAdmin,
} from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

// Admin Login
adminRouter.post("/login", loginAdmin);

// Add a new doctor (Admin Protected)
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

// Get all doctors (GET is better than POST for fetching)
adminRouter.get("/all-doctors", authAdmin, allDoctors);

// ✅ Correct spelling
adminRouter.post("/change-availability", authAdmin, changeAvailability); // ✅ CORRECT

export default adminRouter;
