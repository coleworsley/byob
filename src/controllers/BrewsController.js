const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[env];
const db = require('knex')(config);

const getBrews = (req, res) => {
  db('brews')
    .select()
    .then(brews => res.status(200).json(brews))
    .catch(error => res.status(404).json({ error }));
};

const specificBrew = (req, res) => {
  const id = req.params.id;
  db('brews')
    .where('id', id)
    .select()
    .then((brew) => {
      return brew.length
        ? res.status(200).json(brew[0])
        : res.status(404).json({ error: 'Resource does not exist' });
    });
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
  deleteBrew,
  postBrews,
  specificBrew,
  getBrews,
};
