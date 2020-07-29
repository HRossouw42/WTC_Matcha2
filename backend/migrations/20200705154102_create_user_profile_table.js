exports.up = function (knex) {
    return knex.schema
      .createTable('user_profile', function (table) {
        table.string('user_email').primary()
        table.foreign('user_email').references('email').inTable('users')
        table.string('gender')
        table.string('preference').defaultTo('any')
        table.string('bio', 500)
        table.blob('picture_1')
        table.blob('picture_2')
        table.blob('picture_3')
        table.blob('picture_4')
        table.blob('picture_5')
        table.integer('age')
        table.string('likes').defaultTo(0)
        table.string('location')
        table.boolean('smoking').defaultTo(0)
        table.boolean('drinking').defaultTo(0)
        table.boolean('religion').defaultTo(0)
        table.boolean('pets').defaultTo(0)
        table.boolean('children').defaultTo(0)
        table.boolean('complete').defaultTo(0)
        table.string('view_history')
        table.string('like_history')
        table.string('last_online')
        table.boolean('currently_online').defaultTo(0)
      })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_profile')
  }
  