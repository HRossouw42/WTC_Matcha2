exports.up = function (knex) {
    return knex.schema
      .createTable('users', function (table) {
        table.string('email').primary()
        table.string('password')
        table.string('first_name')
        table.string('last_name')
        table.boolean('confirmed').defaultTo(0)
      })
  }
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
  }