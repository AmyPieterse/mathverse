const database = require('../config')
const {sign, verify} = require('jsonwebtoken')

require("dotenv")

function createToken(user){
    const payload={
        userId: user.userId, 
    }

    return sign(payload, process.env.SECRET_KEY,{
        expiresIn: '1h',
    })
}

function verifyAToken(req, res, next){
    try{
        const token = req.headers["authorization"]
        if(!token){
            return res.status(401).json({
                status:res.statusCode,
                msg:'Authorization token not found'
            })
        }
        const decodedToken = verify(token, process.env.SECRET_KEY);
        if(!decodedToken){
            return res.status(403).json({
                status:res.statusCode,
                msg:"Invalid token"
            })
        }
        req.user=decodedToken;
        next()
    }catch(error){
        console.error(error)
        res.status(500).json({
            status: res.statusCode,
            msg: "Server Error"
        })
    }
}
module.exports = {
    createToken,
    verifyAToken
}