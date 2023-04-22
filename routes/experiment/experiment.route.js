const express = require('express');
const ExperimentController = require('./../../controllers/experiment/experiment.controller');

const routes = express.Router();

routes.post('/experiments', ExperimentController.create);

routes.get('/experiments/:id', ExperimentController.findById);

routes.put('/experiments/:id', ExperimentController.update);

routes.delete('/experiments/:id', ExperimentController.delete);

module.exports = routes;