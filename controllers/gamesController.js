const { Game } = require('../models');

// Create a new game
exports.createGame = async (req, res, next) => {
  try {
    const data = req.body;
    const game = await Game.create(data);
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
};

// Get list of games with simple pagination and filters
exports.getGames = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, title, platform, genre, developer, rating_min, rating_max, sort } = req.query;
    const where = {};
    const { Op } = require('sequelize');

    if (title) where.title = { [Op.like]: `%${title}%` };
    if (platform) where.platform = platform;
    if (genre) where.genre = genre;
    if (developer) where.developer = developer;
    if (rating_min) where.rating = { ...(where.rating || {}), [Op.gte]: parseFloat(rating_min) };
    if (rating_max) where.rating = { ...(where.rating || {}), [Op.lte]: parseFloat(rating_max) };

    const offset = (page - 1) * limit;

    const order = [];
    if (sort) {
      const [field, dir] = sort.split(':');
      const direction = dir && dir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      order.push([field, direction]);
    }

    const { count, rows } = await Game.findAndCountAll({ where, limit: parseInt(limit), offset: parseInt(offset), order });
    res.json({ total: count, page: parseInt(page), limit: parseInt(limit), data: rows });
  } catch (err) {
    next(err);
  }
};

// Get a single game by id
exports.getGameById = async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    next(err);
  }
};

// Update a game
exports.updateGame = async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    await game.update(req.body);
    res.json(game);
  } catch (err) {
    next(err);
  }
};

// Delete a game
exports.deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    await game.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
