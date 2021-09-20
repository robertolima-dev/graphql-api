// Update with your config settings.
require('dotenv').config()

module.exports = {
    client: 'mysql2',
    connection: {
        host: process.env.APP_DB_HOST,
        database: process.env.APP_DB_DATABASE,
        user: process.env.APP_DB_USER,
        password: process.env.APP_DB_PASSWORD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: './db/migrations',
        tableName: 'knex_migrations'
    }
};
