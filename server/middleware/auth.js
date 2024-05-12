const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // Check if the token has expired
    if (decoded.exp < Date.now() / 1000) {
      return res
        .status(401)
        .json({ error: "Access Denied. Token has expired." });
    }

    req.user = decoded.user;

    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res
        .status(401)
        .json({ error: "Access Denied. Token has expired." });
    }

    res.status(400).json({ error: "Invalid token." });
  }
};
