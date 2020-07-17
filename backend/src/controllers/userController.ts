import { destroy, user, users, everything, single } from '../models/user'
import jwt from 'jsonwebtoken'
import { db } from '../index'
import { transporter } from '../index'
import bcrypt from 'bcrypt'

export async function create (ctx: any){
    
    const { email } = ctx.request.body
    const deleted = destroy(email)

    if (deleted) {
        ctx.status = 200
    }
    else{
        ctx.status = 400
    }
}

export async function verify (ctx: any){
    try{
        const valid: any = jwt.verify(ctx.params.token, 'secret')
        const email = valid.email
        
        if (valid){
            db.run(`UPDATE users\
            SET confirmed = 1\
            WHERE email = (?)`,
            email)
        }

        ctx.status = 200  //set redirect
    } catch(e){
        console.log(e)
        ctx.status = 400
    }
}

export async function forgot (ctx: any){
    try{
        const email = ctx.request.body
        const valid = await user(email)
        
        if (valid) {
            const token = jwt.sign({ email: email }, 'secret')
            const url = `http://localhost:8080/account/reset-password?token=${token}`
            await transporter.sendMail({
                to: email,
                subject: 'Forgotten Password',
                html: `Please click this link to reset your password: <a href="${url}">${url}</a>`
            })
        }
        ctx.status = 200  //set redirect
    } catch(e){
        console.log(e)
        ctx.status = 400
    }
}

export async function reset (ctx: any){
    try{
        console.log(ctx.request.body.token.token)
        const valid: any = jwt.verify(ctx.request.body.token.token, 'secret')
        const email = valid.email

        const salt = await bcrypt.genSalt()
        const hashedPassword = bcrypt.hashSync(ctx.request.body.token.password, salt)
        
        if (valid){
            db.run(`UPDATE users\
            SET password = (?)\
            WHERE email = (?)`,
            hashedPassword, email)
        }

        ctx.status = 200  //set redirect
    } catch(e){
        console.log(e)
        ctx.status = 400
    }
}

export async function all (ctx: any){
    try{
        const all = await everything()
        ctx.body = all
        ctx.status = 200
    } catch(e){
        console.log(e)
        ctx.status = 400
    }
}

export async function id (ctx: any){
    try{
        const id = ctx.params.id
        const all = await single(id)
        ctx.body = all
        ctx.status = 200
    } catch(e){
        console.log(e)
        ctx.status = 400
    }
}