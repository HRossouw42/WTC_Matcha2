exports.up = function (knex) {
    return knex.schema
      .createTable('tags', function (table) {
        table.string('user_email').primary()
        table.foreign('user_email').references('email').inTable('users')
        table.boolean('smoke')
        table.boolean('drink')
        table.boolean('religious')
        table.boolean('pets')
        table.boolean('children')
        table.string('astrology')
      })
  }
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tags')
  }