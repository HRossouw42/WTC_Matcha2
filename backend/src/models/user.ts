import { db } from '../index'

export async function User (user: any){
  
  db.run(`INSERT INTO users (email, username, password, first_name, last_name, dob)\
  VALUES(?, ?, ?, ?, ?, ?)`,
  user.email, user.username, user.password, user.first_name, user.last_name, user.dob)

  db.run(`INSERT INTO user_profile (user_email)\
  VALUES(?)`,
  user.email)

}