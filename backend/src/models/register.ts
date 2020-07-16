import { db } from '../index'

export async function register (user: any):Promise<boolean>{

  try{
    db.run(`INSERT INTO users (email, password, first_name, last_name)\
    VALUES(?, ?, ?, ?)`,
    user.email, user.password, user.first_name, user.last_name)

    db.run(`INSERT INTO user_profile (user_email)\
    VALUES(?)`,
    user.email)

    return true
  }
  catch(error){
    return false
  }

}