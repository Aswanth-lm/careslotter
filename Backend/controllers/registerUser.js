import validator from 'validator';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default registerUser;
