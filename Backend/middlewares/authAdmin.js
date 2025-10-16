import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    const token = authHeader.split(' ')[1]; // get token from 'Bearer <token>'

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: check email if you want
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
    }

    req.admin = decoded;
    next();

  } catch (error) {
    console.error("JWT error:", error);
    return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
  }
};

export default authAdmin;
