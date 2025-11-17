const StudentCreate = require("./../../../use-cases/student/create")
const allGet = require("./../../../use-cases/student/allGet")
const classAddUseCase = require("./../../../use-cases/student/classAdd")
const homeworkUseCase = require("./../../../use-cases/student/homework")
const attendanceUseCase = require("./../../../use-cases/student/attendance")
const examUseCase = require("./../../../use-cases/student/exam")
const pointUseCase = require("./../../../use-cases/student/point")
const deleteeUseCase = require("./../../../use-cases/student/deletee")
const filecreateUseCase = require("./../../../use-cases/student/filecreate")
const mesajgetUseCase = require("./../../../use-cases/student/mesajget")







const classGet = require("./../../../use-cases/student/classGet")



const StudentRepository = require("../../../infrastructure/db/StudentRepository")



async function create(req,res) {
    try {
        

        if(req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"

       
        

        
       let result = await StudentCreate(req.body,{StudentRepository})
       res.status(201).json(result)



    } catch (error) {



       


 console.log(error.message)
        if((error.message).includes("UNIQUE KEY")) res.status(401).json({error:"Bu Öğrenci Numarası zaten var."})
        else res.status(400).json({error:error.message})
    }
}



async function all(req,res) {
    try {

        let result = await allGet({StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}


async function classAll(req,res) {
    try {
        let result = await classGet({StudentRepository})
   
        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

async function classAdd(req,res) {
    try {
        let result = await classAddUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}


async function homework(req,res) {
    try {
        console.log(req.body)
        let result = await homeworkUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}


async function attendance(req,res) {
    try {
        console.log(req.body)
        let result = await attendanceUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

async function exam(req,res) {
    try {
       
        let result = await examUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}


async function point(req,res) {
    try {
       
        let result = await pointUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

async function deletee(req,res) {
    try {
       
        let result = await deleteeUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}


async function filecreate(req,res) {
    try {

        if(req.file != undefined) req.body.filename = req.file.filename
        else  res.status(400).json(false)
     let result = await filecreateUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
    
}
async function mesajget(req,res) {
    try {
       
        let result = await mesajgetUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

module.exports = {create,all,classAdd,classAll,homework,attendance,exam,point,deletee,filecreate,mesajget}