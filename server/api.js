const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase
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
apiRouter.post('/ideas', (req, res, next) => {
    const newIdea = req.body;
    const addedIdea = addToDatabase('ideas', newIdea);

    if (addIdeaToDatabase) {
        res.status(201).send(addedIdea);

    } else {
        res.status(400).send();
    }

});
//GET /api/ideas/:ideaId to get a single idea by id.
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const fetchedIdea = getFromDatabaseById('ideas', ideaId);

    if (fetchedIdea) {
        res.status(200).send(fetchedIdea);
    } else {
        res.status(404).send();
    }
});
//PUT /api/ideas/:ideaId to update a single idea by id.
apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const newIdea = { ...req.body, id: ideaId };
    const updatedIdea = updateInstanceInDatabase('ideas', newIdea);

    if (updatedIdea) {
        res.status(200).send(updatedIdea);
    } else {
        res.status(404).send();
    }
});

//DELETE /api/ideas/:ideaId to delete a single idea by id.
apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const ideaDeleted = deleteFromDatabasebyId('ideas', ideaId);

    if (ideaDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

//GET /api/meetings to get an array of all meetings.
apiRouter.get('/meetings', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    res.status(200).send(allMeetings);
});
//POST /api/meetings to create a new meeting and save it to the database.
apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = req.body;
    const addedMeeting = addToDatabase('meetings', newMeeting);

    if (addedMeeting) {
        res.status(201).send(addedMeeting);
    } else {
        res.status(400).send();
    }
});
//DELETE /api/meetings to delete all meetings from the database.
apiRouter.delete('/meetings', (req, res, next) => {
    const deleteMeetings = deleteAllFromDatabase('meetings');

    if (deleteMeetings) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

module.exports = apiRouter;
