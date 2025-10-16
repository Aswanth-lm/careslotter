import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false, message: "Missing credentials" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });

    res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default loginUser;
