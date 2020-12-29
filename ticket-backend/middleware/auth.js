const jwt = require('jsonwebtoken');
const config = require('config');
const db = config.get('TOKEN_SECRET');

function auth (req, res, next) {
  let token = req.header('auth-token');
  if (
    req.headers.authorization 
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, db);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = auth;