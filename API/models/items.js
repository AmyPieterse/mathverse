const database = require ('../config')

class Courses{ 
    fetchCourses(req,res){
        const query =
        `SELECT courseID, title, description, price, creationDate, courseImg, grade
        FROM courses;`
        database.query(query,(err,results)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                results
            })
        })
    }
    fetchCourse(req,res){
        const query =`SELECT courseID, title, description, price, creationDate, courseImg, grade
        FROM courses
        WHERE courseID = ${req.params.id};`
        
        database.query(query,(err,result)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                result: result[0]
            })
        })
    }
    async createCourse(req,res){
        const data =req.body 
        
        const course ={
            title : data.title,
            description : data.description,
            price : data.price,
            creationDate : data.creationDate,
            image : data.courseImg,
            grade: data.grade
        }
        const query =`
        INSERT INTO courses
        SET ?;
        `
        database.query(query,[data],(err)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "Course inserted"
            })
        })
    }
    updateCourse(req,res){
        const data = req.body
        const query =`
        UPDATE courses
        SET ?
        WHERE courseID = ${req.params.id};
        `
        database.query(query,[req.body],(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "The course record has been updated"
            })
        })
    }
    deleteCourse(req,res){
        const query =`DELETE FROM courses WHERE courseID = ${req.params.id};`
        
        console.log(query)
        
        database.query(query,(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "The course record has been deleted"
            })
        })
    }
}
module.exports = Courses