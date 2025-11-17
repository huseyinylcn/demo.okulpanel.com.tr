
const scheduleCreate = require("./../../../use-cases/schedule/create")
const teacherget = require("./../../../use-cases/schedule/tacherget")
const scheduleDeleteUseCase = require("./../../../use-cases/schedule/scheduleDelete")
const gainUseCase = require("./../../../use-cases/schedule/gain")
const gainaddUseCase = require("./../../../use-cases/schedule/gainadd")
const getclassUseCase = require("./../../../use-cases/schedule/getclass")
const derslerUseCase = require("./../../../use-cases/schedule/dersler")
const schoolsUseCase = require("./../../../use-cases/schedule/schools")
const lessonaddUseCase = require("./../../../use-cases/schedule/lessonadd")
const lessondeleteUseCase = require("./../../../use-cases/schedule/lessondelete")
const courseStudentAddUseCase = require("./../../../use-cases/schedule/courseStudentAdd")
const courseStudentgetUseCase = require("./../../../use-cases/schedule/courseStudentget")
const courseStudentDeleteUseCase = require("./../../../use-cases/schedule/courseStudentDelete")
const gaindbaddUseCase = require("./../../../use-cases/schedule/gaindbadd")
const gaindbdeleteUseCase = require("./../../../use-cases/schedule/gaindbdelete")
const classGroupUseCase = require("./../../../use-cases/schedule/classGroup")

const gainnewgetUseCase = require("./../../../use-cases/schedule/gainnewget")
const gaindbnewaddUseCase = require("./../../../use-cases/schedule/gaindbnewadd")
const gainnewdeleteUseCase = require("./../../../use-cases/schedule/gainnewdelete")
const gainRegistereGetUseCase = require("./../../../use-cases/schedule/gainRegistereGet")




const classGroupAddUseCase = require("./../../../use-cases/schedule/classGroupAdd")
const classGroupDeleteUseCase = require("./../../../use-cases/schedule/classGroupDelete")










const scheduleRepository = require("./../../../infrastructure/db/scheduleRepository")







// Örnek kullanım



async function create(req,res) {
   try {
        let result =  await scheduleCreate(req.body,{scheduleRepository})
        res.status(200).json(result)
 
   } catch (error) {
        res.status(400).json({error:error.message})
   }


}

async function getteacher(req,res,next) {
     try {
          let result = await teacherget(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}



async function scheduleDelete(req,res,next) {
     try {
        let result = await scheduleDeleteUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}


async function gain(req,res,next) {
     try {
        let result = await gainUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}


async function gainadd(req,res,next) {
     try {
        let result = await gainaddUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}

async function getclass(req,res,next) {
     try {
          console.log(req.user)
     req.body.OgrenciId = req.user.id
        let result = await getclassUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}

async function dersler(req,res,next) {
     try {
        let result = await derslerUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          console.log(error)
          res.status(400).json({error:error.message})
     }
}





async function schools(req,res,next) {
     try {



        let result = await schoolsUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}




async function schools(req,res,next) {
     try {
        let result = await schoolsUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}

async function lessonadd(req,res,next) {
     try {
        let result = await lessonaddUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}


async function lessondelete(req,res,next) {
     try {
          
        let result = await lessondeleteUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}



async function courseStudentAdd(req,res,next) {
     try {
          
        let result = await courseStudentAddUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}

async function courseStudentget(req,res,next) {
     try {
          
        let result = await courseStudentgetUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}

async function courseStudentdelete(req,res,next) {
     try {
          
        let result = await courseStudentDeleteUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}
async function gaindbadd(req,res,next) {
     try {
          
        let result = await gaindbaddUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}

async function gaindbdelete(req,res,next) {
     try {
          
        let result = await gaindbdeleteUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}


async function classGroup(req,res,next) {
     try {
          
        let result = await classGroupUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}

async function classGroupAdd(req,res,next) {
     try {
          
        let result = await classGroupAddUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}


async function classGroupDelete(req,res,next) {
     try {
          
        let result = await classGroupDeleteUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
     
          res.status(400).json({error:error.message})
     }
}

async function gainnewget(req,res,next) {

     try {
          let result = await gainnewgetUseCase(req.body, {scheduleRepository})
          // console.log(result)
          res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}


async function gainnewadd(req,res,next) {

     try {
          let result = await gaindbnewaddUseCase(req.body, {scheduleRepository})
          // console.log(result)
          res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}


async function gainnewdelete(req,res,next) {

     try {
          let result = await gainnewdeleteUseCase(req.body, {scheduleRepository})
          // console.log(result)
          res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}

async function gainRegisteredGet(req,res,next) {

     try {
          let result = await gainRegistereGetUseCase(req.body, {scheduleRepository})
          // console.log(result)
          res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}


async function version(req,res,next) {

     try {
         
       
          res.status(200).json({version:'1.1.6'})
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}





module.exports = {gainnewget,version,gainRegisteredGet, gainnewdelete, gainnewadd, classGroup, classGroupAdd,classGroupDelete,  create,getteacher,gaindbdelete,scheduleDelete,gaindbadd,gain,gainadd,getclass,dersler,schools,lessonadd,lessondelete, courseStudentAdd,courseStudentget,courseStudentdelete}