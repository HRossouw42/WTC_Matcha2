import bcrypt from 'bcrypt'
import { user } from '../models/user'
import jwt from 'jsonwebtoken'
import { setOnline } from '../models/profile'

const secret = 'secret'

export async function create (ctx: any){
    
    const { email, password } = ctx.request.body
    const User = await user(email)

    // check if email exists
    if (!User) {
        return ctx.status = 400
    }

    if (!User.confirmed) {
        return ctx.status = 401
    }

    const passwordValid = await bcrypt.compare(password, User.password)

    if (passwordValid){

        const today = new Date()
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const dateTime = date+' '+time

        await setOnline(email, dateTime)

        const token = jwt.sign({
            id: User.id,
            email: User.email,
            first_name: User.first_name,
            last_name: User.last_name
        }, secret )
        
        ctx.cookies.set('Bearer', token, { 
            httpOnly: false })
        ctx.body = token
        ctx.status = 200
    }
    else{
        ctx.status = 401
    }
}