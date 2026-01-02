const { isDate } = require('validator');

module.exports = (req, res, next) => {
  const { title, rating, releaseDate } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Field "title" is required and must be a non-empty string' });
  }
  if (title.length > 200) {
    return res.status(400).json({ error: 'Field "title" must be at most 200 characters' });
  }
  if (rating !== undefined) {
    if (typeof rating !== 'number') return res.status(400).json({ error: 'Field "rating" must be a number when provided' });
    if (rating < 0 || rating > 10) return res.status(400).json({ error: 'Field "rating" must be between 0 and 10' });
  }
  if (releaseDate !== undefined && releaseDate !== null && releaseDate !== '') {
    // simple YYYY-MM-DD check using validator's isDate
    if (!isDate(String(releaseDate))) return res.status(400).json({ error: 'Field "releaseDate" must be a valid date (YYYY-MM-DD)' });
  }

  next();
};
