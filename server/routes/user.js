const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const requestController = require('../controllers/requestController');

router.post('/new', userController.createUser, (req, res) => res.status(200).send('user created'));

router.post('/login', userController.login, (req, res) => res.status(200).json(res.locals.user));

router.post('/saveRequest', requestController.saveRequest, (req, res) => res.status(200).send('request saved'));

router.post('/getRequests', requestController.getRequests, (req, res) => res.status(200).json(res.locals.requests));

router.delete('/deleteRequests', requestController.deleteRequest, (req, res) => res.status(200).send('request deleted'));

module.exports = router;
