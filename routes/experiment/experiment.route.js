const express = require('express');
const ExperimentController = require('./../../controllers/experiment/experiment.controller');

const routes = express.Router();

routes.get('/experiments/getOptions', ExperimentController.getOptions);

routes.get('/experiments/getPhaseOne', ExperimentController.getPhaseOne);

routes.post('/experiments', ExperimentController.create);

routes.get('/experiments/:id', ExperimentController.findById);

routes.put('/experiments/:id', ExperimentController.update);

routes.delete('/experiments/:id', ExperimentController.delete);

routes.get('/experimentsExcel', ExperimentController.exportExcel);

module.exports = routes;