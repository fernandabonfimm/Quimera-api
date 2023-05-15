const express = require('express');
const jwt = require('jsonwebtoken');
const ExperimentController = require('@/controllers/experiment/experiment.controller');
const logger = require('@/logger/logger');

const routes = express.Router();

routes.get('/experiments/getAnswer', ExperimentController.getGrahpic);


// routes.use('/experiments/', function (req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//         logger.log(`Error: ${err}`);

//         if (err) return res.sendStatus(403);

//         req.user = user;

//         next();
//     })
// });

routes.get('/experiments/getOptions', ExperimentController.getOptions);

routes.get('/experiments/getPhaseOne', ExperimentController.getPhaseOne);

routes.post('/experiments', ExperimentController.create);

routes.get('/experiments/:id', ExperimentController.findById);

routes.put('/experiments/:id', ExperimentController.update);

routes.delete('/experiments/:id', ExperimentController.delete);

routes.get('/experiments', ExperimentController.findAll);

routes.get('/experiments/graphic/:id', ExperimentController.getGrahpic);

module.exports = routes;