//orders table (to remove, edit, add to cart)
const database = require('../config')

class Orders{ 
    fetchOrders(req,res){
        const userID = req.params.id;
        const query =
        `SELECT orderID, userID, courseID, orderDate, status
        FROM orders WHERE userID=${userID};`
        
        database.query(query, (err, results)=>{
            if (err){
                console.error(err)
                res.status(500).json({
                    status: 500,
                    msg: "Failed to fetch user orders"
                })
            } 
            else{
                res.status(200).json({
                    status: 200,
                    orders: results
                })
            }
        })
    }
    fetchOrder(req,res){
        const query =`SELECT orderID, userID, courseID, orderDate, status
        FROM orders
        WHERE orderID = ${req.params.id};`
        
        database.query(query,(err,result)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                result: result[0]
            })
        })
    }
    async createOrder(req,res){
        const data =req.body 
        
        const order ={
            userID : data.userID,
            courseID : data.courseID,
            orderDate : new Date(),
            status: 'pending'
        }
        const query =`
        INSERT INTO orders
        SET ?;
        `
        database.query(query,order,(err)=>{
            if (err){
                console.error(err)
                res.status(500).json({
                    status:500,
                    msg: "failed to create order"
                })
            }
            else{
                res.status(201).json({
                    status:201,
                    msg:"order created"
                })
            }
        })
    }
    updateOrderStatus = (orderID,newStatus,callback)=>{
        
        const updateQuery=`UPDATE orders
        SET status = ?
        WHERE orderID = ?`

        database.query(updateQuery,[newStatus,orderID], (err,result)=>{
            if (err){
                console.error(err)
                callback(err, null)
            }
            else{
                if(result.affectedRows===1){
                    callback(null,"order status updated")
                }
                else{
                    callback("order not found",null)
                }
            }
        })
    }
    deleteOrders = (userID,callback)=>{
        const query =`DELETE FROM orders 
        WHERE userID = ?`
        
        database.query(deletequery,[userID],(err,result)=>{
            if(err){
                console.error(err)
                callback(err,null)
            }
            else{
                callback(null,"orders deleted")
            }
            
        })
    }
    delete(req,res){
        const query =`
        DELETE users, orders
        FROM users
        LEFT JOIN orders ON users.userID = orders.userID
        WHERE users.userID = ${req.params.id};
        `
        database.query(query,(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "The user record has been deleted."
            })
        })
    }
    deleteOrder = (userID, orderID, callback)=>{
        
        const deleteQuery =`
        DELETE FROM order
        WHERE userID = ? AND orderID = ?`

        database.query(deleteQuery,[userID, orderID],(err,result)=>{
            if(err){
                console.error(err)
                callback(err,null)
            }
            else{
                if (result.affectedRows===1){
                    callback(null,"order deleted")
                }
                else{
                    callback("order not found for user")
                }
            }
        })

    }

}
module.exports = Orders