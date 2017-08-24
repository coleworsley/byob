
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('ratings', (table) => {
    table.increments('id').primary();
    table.integer('brews_id').unsigned();
    table.foreign('brews_id').references('brews.id');
    table.integer('rating');
    table.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('ratings'),
]);
