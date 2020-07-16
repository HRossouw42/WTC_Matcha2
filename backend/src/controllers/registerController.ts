import bcrypt from 'bcrypt'
import { register } from '../models/register'

export async function create (ctx: any){

  console.log(ctx.request.body)

  const salt = await bcrypt.genSalt()
  const hashedPassword = bcrypt.hashSync(ctx.request.body.password, salt)

  //check if email exists
  //autofill location in user_profile table
  
  const user = {
    email: ctx.request.body.email,
    password: hashedPassword,
    first_name: ctx.request.body.first_name,
    last_name: ctx.request.body.last_name
  }

  const success = await register(user)

  if(success){
    ctx.status = 200
  } else{
    ctx.status = 401
  }
}
