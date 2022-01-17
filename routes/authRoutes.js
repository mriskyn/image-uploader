const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

router.post('/auth/register', async (req, res) => {
  const data = req.body;

  try {
    const user = await User.create(data);

    return res.status(201).send({ user });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        msg: 'Wrong Username / Password',
      });
    }

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) {
      return res.status(400).json({
        msg: 'Wrong Username / Password',
      });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    return res.json({ token });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
