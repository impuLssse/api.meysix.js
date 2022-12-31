import dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'

const mysql = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
    logging: false
})

export default mysql
