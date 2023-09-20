require("dotenv").config()
const {createPool} = require("mysql")

//Set up database connection
const connection = createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE,
    multipleStatements: true,
    connectionLimit: 30,
})

module.exports= connection