const express = require('express');
const controller = require('./controller');
const jwt = require('jsonwebtoken');

const router = express.Router();

const checkAuth = ((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      error: 'You must be authorized to use this endpoint',
    });
  }
  const decoded = jwt.verify(token, process.env.SECRETKEY);

  if (!decoded) {
    return res.status(403).json({
      error: 'Invalid token',
    });
  }

  return next();
});

router.post('/auth', controller.generateToken);
router.get('/api/v1/brews', controller.getBrews);
router.get('/api/v1/breweries', controller.getBreweries);
router.post('/api/v1/brews', checkAuth, controller.postBrews);
router.post('/api/v1/breweries', controller.postBreweries);
router.delete('/api/v1/breweries/:id', controller.deleteBrewery);
router.delete('/api/v1/brews/:id', controller.deleteBrew);
router.get('/api/v1/brews/:id', controller.specificBrew);


module.exports = router;
