
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('breweries', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('city');
    table.string('state');
    table.timestamps(true, true);
  }),

  knex.schema.createTable('brews', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('style');
    table.float('abv');
    table.float('ibu');
    table.float('ounces');
    table.integer('brewery_id').unsigned();
    table.foreign('brewery_id').references('breweries.id');
    table.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('brews'),
  knex.schema.dropTable('breweries'),
]);
