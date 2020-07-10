import Knex from 'knex'
import koa from 'koa'
import bodyParser from 'koa-body'
import router from './app'

const sqlite3 = require('sqlite3').verbose()
export const db = new sqlite3.Database('./test.db')

const knex = Knex({
    client: 'sqlite3',
    connection: {
        filename: './test.db'
    },
    useNullAsDefault : true
})

const app = new koa()
app.use(bodyParser())

knex.migrate.latest()

app.use(router.routes());
app.listen(3001);
