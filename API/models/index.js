//import all models
const Users = require('./users')
const Courses = require('./items')
const Orders = require('./orders')


//Export all objects
module.exports ={
    users: new Users(), 
    items: new Courses(),
    orders: new Orders()
}