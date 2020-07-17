import bcrypt from 'bcrypt'
import { register } from '../models/register'
import { user } from '../models/user'
import jwt from 'jsonwebtoken'
import { transporter } from '../index'

export async function create (ctx: any){

  try{

    console.log(ctx.request.body)

    const exists = await user(ctx.request.body.email)

    // check if email exists
    if (exists) {
        return ctx.status = 400
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = bcrypt.hashSync(ctx.request.body.password, salt)

    //autofill location in user_profile table
    
    const User = {
      email: ctx.request.body.email,
      username: ctx.request.body.username,
      password: hashedPassword,
      first_name: ctx.request.body.first_name,
      last_name: ctx.request.body.last_name
    }

    const success = await register(User)

    if(success){
      const token = jwt.sign({ email: ctx.request.body.email }, 'secret')
      const url = `http://localhost:3000/verify/${token}`
      await transporter.sendMail({
        to: ctx.request.body.email,
        subject: 'Confirm Email',
        html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
      })
      ctx.status = 200
    } else{
      ctx.status = 401
    }
  } catch (e){
    console.log(e)
  }
}
