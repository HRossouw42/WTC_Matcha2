exports.up = function (knex) {
    return knex.schema
      .createTable('blocked', function (table) {
        table.string('user_email').primary()
        table.foreign('user_email').references('email').inTable('users')
        table.string('user_1')
        table.string('user_2')
        table.string('user_3')
        table.string('user_4')
        table.string('user_5')
      })
  }
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('blocked')
  }