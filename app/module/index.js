const dbConfig = require("../config/db.config.js")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAlias: false,

    define: {
        timestamps: false
    },

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acacquire,
        idle: dbConfig.pool.idle 
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.tutorial = require("./tutorial.module.js")(sequelize, Sequelize)

module.exports = db