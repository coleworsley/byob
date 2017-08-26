const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line
const path = require('path');

const app = express();
const port = (process.env.PORT || 3000);
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const db = require('knex')(config);

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

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/auth', (req, res) => {
  const payload = req.body;

  const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '48h' });

  res.status(201).json({ token });
});

app.get('/api/v1/brews', (req, res) => {
  db('brews')
    .select()
    .then(brews => res.status(200).json(brews))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/v1/breweries', (req, res) => {
  db('breweries')
    .select()
    .then(breweries => res.status(200).json(breweries))
    .catch(error => res.status(404).json({ error }));
});

app.post('/api/v1/brews', (req, res) => {
  const newBrew = req.body;

  for (let requiredParam of ['brewery_id', 'name', 'style']) {
    if (!newBrew[requiredParam]) {
      return res.status(422).json({
        error: `Missing required parameter ${requiredParam}`,
      });
    }
  }

  db('brews')
    .insert(req.body, '*')
    .then((brew) => {
      return res.status(200).json(brew[0]);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
});

app.post('/api/v1/breweries', (req, res) => {
  const newBrewery = req.body;

  db('breweries').insert(newBrewery, 'id')
    .then(brewery => res.status(201).json({ id: brewery[0] }))
    .catch(error => res.status(500).json({ error }));
});

app.delete('/api/v1/breweries/:id', (req, res) => {
  const id = req.params.id;
  db('breweries').where('id', id).del()
    .then((obj) => {
      if (res > 0) {
        return res.status(200).json(obj);
      } else {
        return res.status(404).json({ error: 'Resource does not exist' });
      }
    })
    .catch(error => res.status(501).json({ error }));
});

app.delete('/api/v1/brews/:id', (req, res) => {
  const id = req.params.id;
  db('brews').where('id', id).del().returning('*')
    .then((obj) => {
      return obj.length
        ? res.status(200).json(obj[0])
        : res.status(404).json({ error: 'Resource does not exist' });
    })
    .catch(error => res.status(501).json({ error }));
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App is listening on http://localhost:${port}`);
});

module.exports = { app, db };
