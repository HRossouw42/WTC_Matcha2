import bcrypt from 'bcrypt'
import { user } from '../models/user'
import jwt from 'jsonwebtoken'

const secret = 'secret'

export async function create (ctx: any){

    console.log(ctx.request.body)
    
    const { email, password } = ctx.request.body
    const User = await user(email)

    const passwordValid = await bcrypt.compare(password, User.password)

    if (passwordValid){
        const token = jwt.sign({
            email: User.email,
            first_name: User.first_name,
            last_name: User.last_name
        }, secret)
        ctx.body = token
        ctx.status = 200
    }
    else{
        ctx.status = 401
    }
}