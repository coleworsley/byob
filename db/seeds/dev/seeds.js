const brews = require('../../Data/beers.json');
const breweries = require('../../Data/breweries.json');

exports.seed = (knex, Promise) => knex('brews').del()
  .then(() => knex('breweries').del())
  .then(() => Promise.all(breweries.map((brewery) => {
    return knex('breweries').insert(brewery, ['id', 'original_id']);
  })))
  .then((ids) => {
    return Promise.all(brews.map((brew) => {
      const breweryId = ids.find((idObj) => {
        return idObj[0].original_id === parseInt(brew.brewery_id, 10);
      })[0].id;

      const newBrew = Object.assign({}, brew, { brewery_id: breweryId });

      return knex('brews').insert(newBrew).then(() => 'created');
    }))
      .then(() => 'created');
  });
