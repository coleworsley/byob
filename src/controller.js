const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const db = require('knex')(config);
const jwt = require('jsonwebtoken');

const generateToken = (req, res) => {
  const payload = req.body;

  const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '48h' });

  res.status(201).json({ token });
};

const getBrews = (req, res) => {
  db('brews')
    .select()
    .then(brews => res.status(200).json(brews))
    .catch(error => res.status(404).json({ error }));
};

const getBreweries = (req, res) => {
  db('breweries')
    .select()
    .then(breweries => res.status(200).json(breweries))
    .catch(error => res.status(404).json({ error }));
};

const postBrews = (req, res) => {
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
};

const postBreweries = (req, res) => {
  const newBrewery = req.body;

  db('breweries').insert(newBrewery, 'id')
    .then(brewery => res.status(201).json({ id: brewery[0] }))
    .catch(error => res.status(500).json({ error }));
};

const deleteBrewery = (req, res) => {
  const id = req.params.id;
  db('breweries').where('id', id).del()
    .then((obj) => {
      return obj.length
        ? res.status(200).json(obj[0])
        : res.status(404).json({ error: 'Resource does not exist' });
    })
    .catch(error => res.status(501).json({ error }));
};

const deleteBrew = (req, res) => {
  const id = req.params.id;
  db('brews').where('id', id).del().returning('*')
    .then((obj) => {
      return obj.length
        ? res.status(200).json(obj[0])
        : res.status(404).json({ error: 'Resource does not exist' });
    })
    .catch(error => res.status(501).json({ error }));
};

module.exports = {
  generateToken,
  getBrews,
  getBreweries,
  postBrews,
  postBreweries,
  deleteBrewery,
  deleteBrew,
};
