// authMiddleware.js
// Authentication middleware functions


const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {secretKey: SECRET} = require('../config/config')

const authenticateAdminJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({err:err});
      }
      if (user.role != 'admin') {
        return res.json({ message: 'not admin' });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authenticateUserJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        
        return res.json({err:err}).sendStatus(403);

      }
      if (user.role != 'user') {
        return res.json({ message: 'not user' });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = {
  authenticateUserJwt,
  authenticateAdminJwt,
};

// Implement your authentication middleware functions here
