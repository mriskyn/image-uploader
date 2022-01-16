const express = require('express');
const { authorization } = require('../middlewares/auth');
const router = express.Router();
const multerCheck = require('../middlewares/multer');
const { Image } = require('../models');

router.post('/upload/image', authorization, multerCheck(), async (req, res) => {
  const file = req.file;

  console.log({ file });
  console.log(req.user);

  if (!file) {
    return res.status(400).json({
      msg: 'Wrong File input',
    });
  }

  try {
    const image = await Image.create({
      name: file.originalname,
      source: file.filename,
      UserId: req.user.userId,
    });
    res.status(201).json({ image });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
