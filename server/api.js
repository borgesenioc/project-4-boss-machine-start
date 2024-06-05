const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById } = require('./db.js');

//GET /api/minions to get an array of all minions.
apiRouter.get('/minions', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    res.send(allMinions);
});
//POST /api/minions to create a new minion and save it to the database.
apiRouter.post('/minions', (req, res, next) => {
    const newMinion = req.body;
    const addedMinion = addToDatabase('minions', newMinion);

    if (addedMinion) {
        res.status(201).send(addedMinion);
    } else {
        res.status(400).send();
    }
});
//GET /api/minions/:minionId to get a single minion by id.
apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const foundMinion = getFromDatabaseById('minions', minionId);

    if (foundMinion) {
        res.status(200).send(foundMinion);
    } else {
        res.status(400).send();
    }
});
//PUT /api/minions/:minionId to update a single minion by id.
//DELETE /api/minions/:minionId to delete a single minion by id.

module.exports = apiRouter;
