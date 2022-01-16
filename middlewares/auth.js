const jwt = require('jsonwebtoken');

function authorization(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized Request' });
  }

  req.user = jwt.decode(token);
  next();
}

module.exports = { authorization };
