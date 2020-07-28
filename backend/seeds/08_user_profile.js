const faker = require('faker')

exports.seed = async function(knex, Promise) {
  
  async function user() {
    return knex.select('email')
      .from('users')
      .then(function (result = []) {
        return(result)
      })
    }

  const users =  await user()

  const profile = []

  function getRandomInt(min, max) { //inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function dateTime(){
    var today = new Date();

    var date = today.getFullYear()+'-'+(getRandomInt(1, 7))+'-'+getRandomInt(1, 28);
    var time = getRandomInt(0, 23) + ":" + getRandomInt(10, 59) + ":" + getRandomInt(10, 59);
    return (date+' '+time)
  }

  const genderSelect = ['male', 'female', 'nonbinary']
  const preferenceSelect = ['any', 'male', 'female']
  const locationSelect = ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North-West', 'Western Cape', 'Other']



  async function createFakeUser(){
    
    for (let i=100; i < 150; i++) {
      let user_email = users[i].email
      let gender = genderSelect[getRandomInt(0, 2)]
      let preference = preferenceSelect[getRandomInt(0, 2)]
      let bio = faker.lorem.paragraph()
      let picture_1 = faker.image.avatar()
      let picture_2 = faker.image.transport()
      let picture_3 = faker.image.food()
      let picture_4 = faker.image.cats()
      let picture_5 = faker.image.city()
      let age = getRandomInt(18, 100)
      let likes = getRandomInt(0, 50)
      let location = locationSelect[getRandomInt(0, 9)]
      let smoking = faker.random.boolean()
      let drinking = faker.random.boolean()
      let religion = faker.random.boolean()
      let pets = faker.random.boolean()
      let children = faker.random.boolean()
      let complete = 1
      let last_online = dateTime()
    
      profile.push({
        user_email: user_email,
        gender: gender,
        preference: preference,
        bio: bio,
        picture_1: picture_1,
        picture_2: picture_2,
        picture_3: picture_3,
        picture_4: picture_4,
        picture_5: picture_5,
        age: age,
        likes: likes,
        location: location,
        smoking: smoking,
        drinking: drinking,
        religion: religion,
        pets: pets,
        children: children,
        complete: complete,
        last_online: last_online
      })
    }
      return profile
  }

  const profiles  = await createFakeUser()

  // Deletes ALL existing entries
  return knex('user_profile')
    .then(function () {
      // Inserts seed entries
      return knex('user_profile').insert(profiles)
    })
}