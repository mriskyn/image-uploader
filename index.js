require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express')
const path = require('path');
const PORT = process.env.PORT || 4321;

const swaggerDocument = require('./docs')
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use(homeRoutes)
app.use('/api/v1', authRoutes);
app.use('/api/v1', imageRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customSiteTitle: 'Ecommerce API Docs' })
);

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
