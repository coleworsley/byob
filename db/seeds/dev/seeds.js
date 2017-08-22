const brews = require('../../Data/beers.json');
const breweries = require('../../Data/breweries.json');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('brews').del()
  .then(() => knex('breweries').del())

    .then(() => {
      return Promise.all(breweries.map((brewery) => {
        return knex('breweries').insert(brewery);
      }))
    })
    .then(() => {
      return Promise.all(brews.map((brew) => {
        return knex('brews').insert(brew)
      })).then(() => 'created')
    })
};
