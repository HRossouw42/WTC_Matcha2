import { db } from '../index'
import { Profile } from '../models/profile'

export async function update (ctx: any){

    const profile = {
        email: ctx.request.body.email,  //TODO: get email from token
        gender: ctx.request.body.gender,
        sexual_preference: ctx.request.body.sexual_preference,
        bio: ctx.request.body.bio,
        picture_1: ctx.request.body.picture_1,
        picture_2: ctx.request.body.picture_2,
        picture_3: ctx.request.body.picture_3,
        picture_4: ctx.request.body.picture_4,
        picture_5: ctx.request.body.picture_5,
        location: ctx.request.body.location,
        tags: ctx.request.body.tags
    }

    Profile(profile)
}
