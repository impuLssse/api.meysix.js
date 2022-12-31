import mysql from '../database.js'
import { DataTypes } from 'sequelize'

const Users = mysql.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nickname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    hashedPassword: {
        type: DataTypes.STRING,
        validate: {
            // is: /^[0-9a-f]/gui,
            min: 4,
            max: 64,
            notEmpty: true,
        },
        allowNull: false,
    },
})

export default Users