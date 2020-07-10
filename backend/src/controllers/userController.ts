import bcrypt from 'bcrypt'
import { User } from '../models/user'

export async function create (ctx: any){

  const salt = await bcrypt.genSalt()
  const hashedPassword = bcrypt.hashSync(ctx.request.body.password, salt)

  //check if email exists
  //check user is 18+ using dob
  //check all fields are vaild
  //autofill email + age + location in user_profile table
  
  const user = {
    email: ctx.request.body.email,
    username: ctx.request.body.username,
    password: hashedPassword,
    first_name: ctx.request.body.first_name,
    last_name: ctx.request.body.last_name,
    dob: ctx.request.body.dob
  }

  User(user)
}
