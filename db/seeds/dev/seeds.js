const brews = require('../../Data/beers.json');
const breweries = require('../../Data/breweries.json');

const parseNumber = (brew) => {
  return Object.assign(brew, { abv: parseFloat(brew.abv) })
};

exports.seed = (knex, Promise) => knex('brews').del()
  .then(() => knex('breweries').del())
  .then(() => Promise.all(breweries.map(brewery => knex('breweries').insert(brewery))))
  .then(() => Promise.all(brews.map((brew) => {
    const newBrew = parseNumber(brew)
    knex('brews').insert(newBrew);
  }))
    .then(() => 'created'));
