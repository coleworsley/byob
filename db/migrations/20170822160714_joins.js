
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_brews', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('brews_id').unsigned();
      table.foreign('brews_id').references('brews.id');
      table.string('review')
      table.integer('rating');
      table.integer('count');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('user_breweries', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('brewery_id').unsigned();
      table.foreign('brewery_id').references('breweries.id');
      table.string('review');
      table.integer('rating');
      table.timestamps(true, true);
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_breweries'),
    knex.schema.dropTable('user_brews'),
  ])
};
