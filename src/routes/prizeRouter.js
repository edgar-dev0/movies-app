const { getAll, create, getOne, remove, update } = require('../controllers/prize.controllers');
const express = require('express');

const prizeRouter = express.Router();

prizeRouter.route('/')
    .get(getAll)
    .post(create);

prizeRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = prizeRouter;