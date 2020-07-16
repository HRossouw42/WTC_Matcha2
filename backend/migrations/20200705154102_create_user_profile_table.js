exports.up = function (knex) {
    return knex.schema
      .createTable('user_profile', function (table) {
        table.string('user_email').primary()
        table.foreign('user_email').references('email').inTable('users')
        table.string('gender')
        table.string('orientation')
        table.string('bio', 500)
        table.blob('picture_1')
        table.blob('picture_2')
        table.blob('picture_3')
        table.blob('picture_4')
        table.blob('picture_5')
        table.string('online')
        table.string('age')
        table.string('likes')
        table.string('location')
        table.boolean('smoking')
        table.boolean('drinking')
        table.boolean('religion')
        table.boolean('pets')
        table.boolean('children')
        table.boolean('complete').defaultTo(0)
      })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_profile')
  }
  