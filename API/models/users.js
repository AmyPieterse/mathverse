//Users table
const database = require ('../config')
const {hash, hashSync, compare} = require('bcrypt')
const {createToken} = require('../middleware/authenicate')
class Users{  
    fetchUsers(req,res){
        const query =
        `SELECT userID, firstName, lastName, username, userDOB, emailAdd, userPass, profileURL, role FROM users;`
        database.query(query,(err,results)=>{
            if(err){
                return res.status(500).json(
                    {
                        status:res.statusCode,
                        error: "Error fetching users"
                    }
                )
            }
            res.json({
                status:res.statusCode,
                results
            })
        })
    }
    fetchUser(req,res){
        const query =`
        SELECT userID, firstName, lastName, username, userDOB, emailAdd, userPass, profileURL, role
        FROM users
        WHERE userID = ${req.params.id};
        `
        database.query(query,(err,result)=>{
            if(err){
                return res.status(500).json({
                    status: res.statusCode,
                    message: 'Error fetching user'
                })
            }
            if(result.length===0){
                return res.status(404).json({
                    status:res.statusCode,
                    message: 'User not found'
                })
            }
            res.json({
                status:res.statusCode,
                result: result[0]
            })
        })
    }
    async register(req,res){
        const data =req.body
        data.userPass = await hash(data.userPass, 15)
        
        const user ={
            firstName : data.firstName,
            lastName : data.lastName,
            username : data.username,
            userDOB : data.userDOB,
            emailAdd : data.emailAdd,
            userPass : data.userPass,
            profileURL : data.profileURL,
            role: data.role
        }
        const query =`
        INSERT INTO users
        SET ?;
        `
        database.query(query,[data],(err)=>{
            if (err) throw err
            let token = createToken(user)
            res.json({
                token,
                status:res.statusCode,
                msg:"You are now registered."
            })
        })
    }
    updateUser(req,res){
        const data = req.body
        if(data.userPass){
            data.userPass = hashSync(data.userPass,15)
        }
        const query =`
        UPDATE users
        SET ?
        WHERE userID = ${req.params.id};
        `
        database.query(query,[req.body],(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "The user record has been updated "
            })
        })
    }
    deleteUser(req,res){
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
    login(req,res){
        const {emailAdd, userPass} = req.body

        const query = `
        SELECT userID, firstName, lastName, username, userDOB, emailAdd, userPass, profileURL, role
        FROM users
        WHERE emailAdd = ?;
        `
        database.query(query,[emailAdd], async(err, result)=>{
            if(err){
                console.error(err)
                return res.status(500).json({
                    status: res.statusCode,
                    error:"Couldn't log in"
                })
            }
            if(!result?.length){
                return res.status(401).json({
                    status: res.statusCode,
                    msg: "Email does not exist"
                })
            }
            const hashedPass = result[0].userPass;
            try{
                const passwordMatch= await compare(userPass, hashedPass)
                    
                if (passwordMatch){
                        const token = createToken({
                            emailAdd
                        })
                        res.json({
                            msg: "You have successfully logged in",
                            token, 
                            result: result[0]
                        })
                    }
                    else {
                        res.status(401).json({
                            status: res.statusCode,
                            msg: "Invalid password"
                        })
                    }
                }
                catch(error){
                    console.error(error)
                    res.status(500).json({
                        status: res.statusCode,
                        error: "Server error"
                    })
                }
        });
    }

}

module.exports = Users