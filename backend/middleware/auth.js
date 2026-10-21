const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Keep this fallback in sync with routes/auth.js. Without it, login can
    // issue a token successfully while every protected endpoint rejects it
    // when JWT_SECRET has not been configured yet.
    const secret = process.env.JWT_SECRET || 'localfix-development-secret-change-before-deploy';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Use after verifyToken to restrict a route to admins only
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

module.exports = { verifyToken, requireAdmin };
