module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './test.db'
      },
      useNullAsDefault : true
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      }
    }
  }
  
  