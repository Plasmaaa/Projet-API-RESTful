const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const validateGame = require('../middlewares/validateGame');
const authApiKey = require('../middlewares/authApiKey');

router.post('/', authApiKey, validateGame, gamesController.createGame);
router.get('/', gamesController.getGames);
router.get('/:id', gamesController.getGameById);
router.put('/:id', authApiKey, validateGame, gamesController.updateGame);
router.delete('/:id', authApiKey, gamesController.deleteGame);

module.exports = router;
