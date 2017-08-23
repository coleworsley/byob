
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('password');
    table.string('email');
    table.string('username');
    table.timestamps(true, true);
  }),

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
    table.decimal('abv');
    table.decimal('ibu');
    table.integer('ounces');
    table.integer('brewery_id').unsigned();
    table.foreign('brewery_id').references('breweries.id');
    table.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('brews'),
  knex.schema.dropTable('breweries'),
  knex.schema.dropTable('users'),
]);
