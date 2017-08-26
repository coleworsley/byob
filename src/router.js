const express = require('express');
const BreweriesController = require('./controllers/BreweriesController');
const AuthController = require('./controllers/AuthController');
const BrewsController = require('./controllers/BrewsController');

const checkAuth = AuthController.checkAuth;
const router = express.Router();

router.post('/auth', AuthController.generateToken);
router.get('/api/v1/brews', BrewsController.getBrews);
router.post('/api/v1/brews', checkAuth, BrewsController.postBrews);
router.delete('/api/v1/brews/:id', checkAuth, BrewsController.deleteBrew);
router.get('/api/v1/brewery/:id/brews', BrewsController.getBreweryBrews);
router.get('/api/v1/brews/:id', BrewsController.specificBrew);

router.get('/api/v1/breweries', BreweriesController.getBreweries);
router.post('/api/v1/breweries', checkAuth, BreweriesController.postBreweries);
router.delete('/api/v1/breweries/:id', checkAuth, BreweriesController.deleteBrewery);
router.patch('/api/v1/breweries/:id', checkAuth, BreweriesController.updateBrewery);

module.exports = router;
