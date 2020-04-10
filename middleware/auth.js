const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  // const token = req.header("x-auth-token");

  // Get token from cookies
  const token = req.cookies.token;

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const decoded = jwt.verify(token, config.get('jwtSecret'));

  if (!decoded) {
    return res.status(401).send("Unauthorized: Invalid token");
  } else {
    req.user = decoded.user;
    next();
  }
};
