import { knex, db } from '../index'

export async function user (email: string):Promise<any> {
    return knex.select('*')
            .from('users')
            .where('email', email)
            .then(function (result) {
              result = result[0]
              return(result)
            })
}

export async function everything ():Promise<any> {
  return knex('users')
          .join('user_profile', 'email', '=', 'user_email')
          .select('*')
          .then(function (result: []) {
            return(result)
          })
}

export async function single(id: number):Promise<any> {
  return knex('users')
          .where('id', id)
          .join('user_profile', 'email', '=', 'user_email')
          .select('*')
          .then(function (result: any) {
            result = result[0]
            return(result)
          })
}

export async function singleByEmail(email: string):Promise<any> {
  return knex('users')
          .where('email', email)
          .join('user_profile', 'email', '=', 'user_email')
          .select('*')
          .then(function (result: any) {
            result = result[0]
            return(result)
          })
}

export async function users ():Promise<any> {
  return knex.select('email')
          .from('users')
          .then(function (result: []) {
            return(result)
          })
}

export async function first_name (email: string):Promise<string> {
  return knex.select('first_name')
          .from('users')
          .where('email', email)
          .then(function (result) {
            result = result[0]
            return(Object.values(result).toString())
          })
}

export async function destroy (email: string):Promise<boolean>{
  try{
    
    db.run(`DELETE FROM users WHERE email=?`, email)
    db.run(`DELETE FROM user_profile WHERE user_email=?`, email)

    return true
  } catch(e){
    return false
  }
}

export async function updateLikeHistory(id: number, user_email: string): Promise<boolean>{
  try{
    const User = await singleByEmail(user_email)
          
    let like_history
    let likes = User.likes

    likes = parseInt(likes) + 1
    
    if (User.like_history){
      like_history = User.like_history.split(",")
    } else {
      like_history = []
    }

    if (!like_history.includes(id.toString())){

      like_history.push(id)
      like_history = like_history.toString()
  
      db.run(`UPDATE user_profile\
      SET like_history = (?)\
      WHERE user_email = (?)`,
      like_history, user_email)

      db.run(`UPDATE user_profile\
      SET likes = (?)\
      WHERE user_email = (?)`,
      likes, user_email)

    }
  
      return true
    }
    catch(error){
      return false
    }
}

export async function unliked(id: number, user_email: string): Promise<boolean>{
  try{
    const User = await singleByEmail(user_email)
          
    let like_history
    let likes = User.likes

    likes = parseInt(likes) - 1

    function removeItemOnce(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr
    }
    like_history = User.like_history.split(",")
    like_history = removeItemOnce(like_history, id.toString())
    if (like_history && like_history.length){
      like_history = like_history.toString()
    }else{
      like_history = null;
    }

      db.run(`UPDATE user_profile\
      SET like_history = (?)\
      WHERE user_email = (?)`,
      like_history, user_email)

      db.run(`UPDATE user_profile\
      SET likes = (?)\
      WHERE user_email = (?)`,
      likes, user_email)
  
      return true
    }
    catch(error){
      return false
    }
}



export async function updateViewHistory(id: number, user_email: string): Promise<boolean>{
  try{
    const User = await singleByEmail(user_email)
          
    let view_history
    
    if (User.like_history){
      view_history = User.like_history.split(",")
    } else {
      view_history = []
    }
    view_history.push(id)
    view_history = view_history.toString()

      db.run(`UPDATE user_profile\
      SET view_history = (?)\
      WHERE user_email = (?)`,
      view_history, user_email)
  
      return true
    }
    catch(error){
      return false
    }
}