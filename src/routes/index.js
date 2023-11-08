const express = require('express');
const router = express.Router();
const genreRouter = require('./genreRouter');
const actorRouter = require('./actorRouter');
const directorRouter = require('./directorRouter');
const movieRouter = require('./movieRouter');

router.use('/genres', genreRouter);
router.use('/actors', actorRouter);
router.use('/directors', directorRouter);
router.use('/movies', movieRouter);

module.exports = router;