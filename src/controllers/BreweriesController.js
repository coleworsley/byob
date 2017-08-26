const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[env];
const db = require('knex')(config);

const getBreweries = (req, res) => {
  db('breweries')
    .select()
    .then(breweries => res.status(200).json(breweries))
    .catch(error => res.status(404).json({ error }));
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


module.exports = {
  getBreweries,
  postBreweries,
  deleteBrewery,
};
