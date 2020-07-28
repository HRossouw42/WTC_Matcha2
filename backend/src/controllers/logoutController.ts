import { setOffline } from '../models/profile'

export async function create (ctx: any){
    try{
        const { email } = ctx.request.body

        const today = new Date()
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const dateTime = date+' '+time

        setOffline(email, dateTime)

        ctx.status = 200

    } catch(e){
        ctx.status = 400
    }
}