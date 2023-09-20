const express = require('express')
const bodyParser = require('body-parser')
const routes = express()

const {users, items, orders} = require('../models')

//GET '/users'
routes.get('/users',(req, res)=>{ 
    users.fetchUsers(req, res)
})

//GET '/users/:id'
routes.get('/users/:id',(req,res)=>{ 
    users.fetchUser(req, res)
})

//POST '/register' (registration)
routes.post('/register',bodyParser.json(), 
    (req,res)=>{
        users.register(req,res)
    }
)

//PATCH '/users/:id'
routes.patch('/users/:id',bodyParser.json(), 
    (req,res)=>{
    users.updateUser(req,res)
})

//POST '/user (login)
routes.post('/login',bodyParser.json(), 
    (req,res)=>{
    users.login(req,res)
    }
)

//DELETE '/user/:id'
routes.delete('/users/:id',(req,res)=>{  
    users.deleteUser(req,res)
})

/*Items Routes*/

//GET '/items'
routes.get('/items', (req,res)=>{ 
    items.fetchCourses(req,res)  
})

//GET '/item/:id'
routes.get('/item/:id',(req,res)=>{
    items.fetchCourse(req,res)  
})

//POST '/items'
routes.post('/items',bodyParser.json(),
    (req,res)=>{
    items.createCourse(req,res) 
    }
)

//PUT '/item/:id'
routes.put('/item/:id', bodyParser.json(), 
    (req,res)=>{
    items.updateCourse(req,res) 
})

//DELETE '/item/:id'
routes.delete('/item/:id',(req,res)=>{  
    items.deleteCourse(req,res) 
})

    /*Orders Routes*/

//GET '/user/:id/carts' To fetch items user had in cart
routes.get('/user/:id/carts',(req,res)=>{
    orders.fetchOrders(req,res)
})
//POST '/user/:id/cart' To add a new item to cart
routes.post('/user/:id/cart',bodyParser.json(),
(req,res)=>{
    orders.createOrder(req,res)
})
//PATCH '/user/:id/cart/:id' To update status of order if user checks out of cart then course added to profile
routes.patch('/user/:id/cart/:id',bodyParser.json(), 
    (req,res)=>{
    orders.updateOrderStatus(req,res)
})

//DELETE '/user/:id/cart' Delete all items from cart
routes.delete('/user/:id/cart ',(req,res)=>{  
    orders.deleteOrders(req,res) 
})

//DELETE '/user/:id/cart/:id' Delete specific item from cart
routes.delete('/user/:id/cart/:id',(req,res)=>{  
    orders.deleteOrder(req,res) 
})

module.exports = {
    express,
    routes
}