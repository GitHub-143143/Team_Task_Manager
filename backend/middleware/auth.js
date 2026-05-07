const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, "secretkey");

    // 🔥 GET FULL USER (IMPORTANT)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user; // now includes role

    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};