//error handling
function errorHandling(err,req,res,next){
    console.error(err)
    
    const status = err.status || 500
    const message = err.message || "An error occurred. Please try again later"
    
    res.status(status).json({
        status,
        message
    })
    next()
}
module.exports = errorHandling