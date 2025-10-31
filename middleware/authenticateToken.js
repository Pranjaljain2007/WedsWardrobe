const admin = require("../config/firebaseAdmin");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log(" No token found");
    return res.status(401).json({ message: "No token found" });
  }

  const token = authHeader.split(" ")[1];

  console.log("Verifying token:", token.slice(0, 30) + "...");


  try {
    const decoded = await admin.auth().verifyIdToken(token);
    console.log(" Incoming Authorization Header:", decoded);


    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token is invalid", error: err.message });
  }
};

module.exports = authenticateToken;
