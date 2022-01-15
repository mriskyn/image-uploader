const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 4321;
const multerCheck = require('./middlewares/multer');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

app.post('/upload/image', multerCheck(), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      msg: 'Wrong File input',
    });
  }

  res.status(201).json({ file });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
