import { knex } from '../index'

export async function user (email: string):Promise<any> {
    return knex.select('*')
            .from('users')
            .where('email', email)
            .then(function (result) {
              result = result[0]
              return(result)
            })
}

export async function users ():Promise<any> {
  return knex.select('email')
          .from('users')
          .then(function (result: []) {
            return(result)
          })
}

export async function first_name (email: string):Promise<string> {
  return knex.select('first_name')
          .from('users')
          .where('email', email)
          .then(function (result) {
            result = result[0]
            return(Object.values(result).toString())
          })
}

export async function destroy (email: string):Promise<boolean> {
  return knex('users')
          .where('email', email)
          .del()
          .then(function () {
            return(true)
          })
}
