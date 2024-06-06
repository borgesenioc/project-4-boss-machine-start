const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId
} = require('./db.js');

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
apiRouter.put('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const existingMinion = getFromDatabaseById('minions', minionId);

    if (!existingMinion) {
        res.status(404).send();
        return;
    }

    const updatedMinion = { ...existingMinion, ...req.body, id: minionId };
    const savedMinion = updateInstanceInDatabase('minions', updatedMinion);

    if (savedMinion) {
        res.status(200).send(savedMinion);
    } else {
        res.status(400).send();
    }
});
//DELETE /api/minions/:minionId to delete a single minion by id.
apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const foundMinion = getFromDatabaseById('minions', minionId);

    if (!foundMinion) {
      res.status(404).send();
      return;
    }
    const deleteMinion = deleteFromDatabasebyId('minions', minionId);

    if (deleteMinion) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

//GET /api/ideas to get an array of all ideas.
apiRouter.get('/ideas', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.send(allIdeas)
});
//POST /api/ideas to create a new idea and save it to the database.
//GET /api/ideas/:ideaId to get a single idea by id.
//PUT /api/ideas/:ideaId to update a single idea by id.
//DELETE /api/ideas/:ideaId to delete a single idea by id.

module.exports = apiRouter;
