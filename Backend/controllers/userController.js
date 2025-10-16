import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.json({ success: true, message: "Registered successfully", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid password" });

    res.json({ success: true, message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
