module.exports = { 
      
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "db_itd102",
    dialect: "mysql",
    pool : {
        max: 5,
        min: 0,
        acacquire: 30000,
        idle: 10000,
    }
}