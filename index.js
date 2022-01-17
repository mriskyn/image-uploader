require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 4321;

const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/api/v1', authRoutes);
app.use('/api/v1', imageRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('DB Connected');
  } catch (err) {
    console.log(err, 'err DB');
  }

  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
}

main();
