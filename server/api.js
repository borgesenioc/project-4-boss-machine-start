const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase } = require('./db.js');

//GET /api/minions to get an array of all minions.
apiRouter.get('/minions', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    res.send(allMinions);
});

//POST /api/minions to create a new minion and save it to the database.
//GET /api/minions/:minionId to get a single minion by id.
//PUT /api/minions/:minionId to update a single minion by id.
//DELETE /api/minions/:minionId to delete a single minion by id.

module.exports = apiRouter;
