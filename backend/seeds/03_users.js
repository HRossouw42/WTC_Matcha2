const faker = require('faker')
const bcrypt = require('bcrypt')

exports.seed = async function(knex, Promise) {

  const users = []
  const salt = await bcrypt.genSalt()

  async function createFakeUser(){
    
    for (let id = 201; id <= 300; id++) {
      
      let hashedPassword = bcrypt.hashSync('123', salt)

      let email = faker.internet.email()
      let username = faker.internet.userName()
      let first_name = faker.name.first_name()
      let last_name = faker.name.last_name()
      let password = hashedPassword
      let role = 'user'
      let confirmed = 1
    
      users.push({
        id: id,
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: role,
        password: password,
        confirmed: confirmed
      })
    }
      return users
  }

  const user = await createFakeUser()

  // Deletes ALL existing entries
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(user)
    })
}