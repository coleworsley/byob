const brews = require('../../Data/beers.json');
const breweries = require('../../Data/breweries.json');

exports.seed = (knex, Promise) => knex('brews').del()
  .then(() => knex('breweries').del())
  .then(() => Promise.all(breweries.map(brewery => knex('breweries').insert(brewery))))
  .then(() => Promise.all(brews.map(brew => knex('brews').insert(brew))).then(() => 'created'));
