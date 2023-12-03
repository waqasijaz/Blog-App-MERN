// jwt.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = "12341234";

const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
  return token;
};

const verifyToken = (token) => {
  try {
    console.log(token, "token");
    console.log(JWT_SECRET, "JWT_SECRET");
    const decoded = jwt.verify(token, JWT_SECRET);

    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
    if (decoded.exp && currentTimestamp > decoded.exp) {
      console.log("Token has expired");
      return null; // Token has expired
    }

    console.log(decoded, "decoding");
    return decoded;
  } catch (err) {
    console.log("Token verification failed:", err);
    return null; // Token is invalid or has expired
  }
};

const authenticate = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const token = header.split(" ")[1];
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }

  req.userId = decodedToken.userId;
  next();
};

module.exports = { generateToken, verifyToken, authenticate };
