const jwt = require('jsonwebtoken');

const generateToken = (data) => jwt.sign(data, process.env.JWT_TOKEN);

module.exports = { generateToken };
