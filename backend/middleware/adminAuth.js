const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_AUTH);
    if (!decoded.isAdmin) {
      return res.sendStatus(401);
    }
    req.user = decoded;

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = adminAuth;
