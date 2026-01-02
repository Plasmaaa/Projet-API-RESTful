const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const gamesRouter = require('./routes/games');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use('/api/games', gamesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API RESTful - Collection de jeux vidéo' });
});
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});
app.use(errorHandler);

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
