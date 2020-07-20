import { Profile } from '../models/profile'
import { user } from '../models/user'
import jwt from 'jsonwebtoken'

export async function update (ctx: any){
    try{
        const User = await user(ctx.request.body.email)
        const valid: any = jwt.verify(ctx.request.body.token, 'secret')
        const email = valid.email
        if (email != User.email){
            return ctx.status = 401
        }
        
        const profile = {
            email: ctx.request.body.email,
            gender: ctx.request.body.gender,
            age: ctx.request.body.age,
            preference: ctx.request.body.preference,
            bio: ctx.request.body.bio,
            picture_1: ctx.request.body.picture_1,
            picture_2: ctx.request.body.picture_2,
            picture_3: ctx.request.body.picture_3,
            picture_4: ctx.request.body.picture_4,
            picture_5: ctx.request.body.picture_5,
            smoking: ctx.request.body.smoking,
            drinking: ctx.request.body.drinking,
            religion: ctx.request.body.religion,
            pets: ctx.request.body.pets,
            location: ctx.request.body.location,
        }

        Profile(profile)
        return ctx.status = 200
    } catch (e){
        console.log(e)
        return ctx.status = 400
    }
}
