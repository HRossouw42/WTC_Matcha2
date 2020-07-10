exports.up = function (knex) {
    return knex.schema
      .createTable('user_profile', function (table) {
        table.string('user_email').primary()
        table.foreign('user_email').references('email').inTable('users')
        table.string('gender')
        table.string('sexual_preference')
        table.string('bio', 500)
        table.blob('picture_1')
        table.blob('picture_2')
        table.blob('picture_3')
        table.blob('picture_4')
        table.blob('picture_5')
        table.string('online')
        table.string('age')
        table.string('hit_counter')
        table.string('location')
      })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_profile')
  }
  