const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Auth header received:", authHeader);
  // console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
  if (!authHeader) return res.status(401).json({ err: "No Token Provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.payload;
    next();
  } catch (err) {
    res.status(401).json({ err: "Invalid token." });
  }
};

module.exports = verifyToken;
