const TeacherCreate = require("./../../../use-cases/teacher/create")
const allGet = require("./../../../use-cases/teacher/allGet")
const scheduleUseCase = require("./../../../use-cases/teacher/schedule")
const derslerUseCase = require("./../../../use-cases/teacher/dersler")
const attendanceUseCase = require("./../../../use-cases/teacher/attendance")
const attendanceaddUseCase = require("./../../../use-cases/teacher/attendanceadd")
const attendanceAddNewUseCase = require("./../../../use-cases/teacher/attendanceAddNew")
const attendanceIdareRaporUseCase = require("./../../../use-cases/teacher/attendanceIdareRapor")


const homeworkUseCase = require("./../../../use-cases/teacher/homework")
const homeworkPointAddV2UseCase = require("../../../use-cases/teacher/homeworkPointAddV2")

const homeworkgetUseCase = require("./../../../use-cases/teacher/homeworkget")
const homeworkdeleteUseCase = require("./../../../use-cases/teacher/homeworkdelete")
const examUseCase = require("./../../../use-cases/teacher/exam")
const examgetUseCase = require("./../../../use-cases/teacher/examget")
const examdeleteUseCase = require("./../../../use-cases/teacher/examdelete")
const pointUseCase = require("./../../../use-cases/teacher/point")

const pointaddUseCase = require("./../../../use-cases/teacher/pointadd")
const examPointAddUseCase = require("./../../../use-cases/teacher/examPointAdd")




const deleteeUseCase = require("./../../../use-cases/teacher/deletee")
const classdeleteeUseCase = require("./../../../use-cases/teacher/classdeletee")
const attendanceRaporUseCase = require("./../../../use-cases/teacher/attendanceRapor")
const pointRaporUseCase = require("./../../../use-cases/teacher/pointRapor")
const mesajgetUseCase = require("./../../../use-cases/teacher/mesajget")
const mesajGetV2UseCase = require("./../../../use-cases/teacher/mesajGetV2")

const homeworkpointUseCase = require("./../../../use-cases/teacher/homeworkpoint")
const homeworkpointaddUseCase = require("./../../../use-cases/teacher/homeworkpointadd")
const studentRaporUseCase = require("./../../../use-cases/teacher/studentRapor")
const filecreaeUseCase = require("./../../../use-cases/teacher/filecreae")
const lessonAssignmentUseCase = require("./../../../use-cases/teacher/lessonAssignment")
const lessonAssignmentGetUseCase = require("./../../../use-cases/teacher/lessonAssignmentGet")
const lessonAssignmentDeleteUseCase = require("./../../../use-cases/teacher/lessonAssignmentDelete")
const attandanceWarningUseCase = require("./../../../use-cases/teacher/attandanceWarning")
const examHomeworkTrialReportUseCase = require("./../../../use-cases/teacher/examHomeworkTrialReport")





const logyaz = require("./../../../utils/logSave")




const { sendNotification } = require("./../../../infrastructure/middleware/fcm_token");











const TeacherRepository = require("./../../../infrastructure/db/TeacherRepository")
const userRepository = require("./../../../infrastructure/db/userRepository")


const helperFunc = require("./../../../utils/helperFunc")



async function create(req, res) {
    try {
        if (req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"
        console.log(req.body.Cinsiyet)
        let result = await TeacherCreate(req.body, { TeacherRepository })
        res.status(200).json({ result })

    } catch (error) {
        if (error.message.trim().includes("ad")) res.status(401).json({ error: error.message })
        else if (error.message.trim().includes("tttccc")) res.status(402).json({ error: error.message })
        else if (error.message.trim().includes("Telefon")) res.status(403).json({ error: error.message })
        else if (error.message.trim().includes("E-POSTA")) res.status(404).json({ error: error.message })
        else if (error.message.trim().includes("Bolum")) res.status(405).json({ error: error.message })
        else if (error.message.trim().includes("Doğum")) res.status(406).json({ error: error.message })

        else if (error.message.trim().includes("UQ__Ogretmen__7E1935ED47C9F5FB")) res.status(408).json({ error: error.message }) //tc kimlik
        else if (error.message.trim().includes("IX_Ogretmenler")) res.status(409).json({ error: error.message }) // eposta

        else res.status(400).json({ error: error.message })






        console.log(error.message)

    }
}

async function allTeacher(req, res) {
    try {
        let result = await allGet({ TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function schedule(req, res) {
    try {
        let result = await scheduleUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}




async function dersler(req, res) {
    try {
        console.log(req.body)
        let result = await derslerUseCase(req.body, { TeacherRepository, helperFunc })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function attendance(req, res) {
    try {
        let result = await attendanceUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function attendanceadd(req, res) {
    try {
       
        let result = await attendanceaddUseCase(req.body, { TeacherRepository,sendNotification })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function attendanceAddNew(req, res) {
    try {
       
        let result = await attendanceAddNewUseCase(req.body, { TeacherRepository,sendNotification })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}




async function homework(req, res) {
    try {
      

        if (req.files != undefined){

            req.body.photo = req.files.map(file => file.filename);
           
            req.body.photo = JSON.stringify(req.body.photo)
        }
        else req.body.photo = "default.png"


        let result = await homeworkUseCase(req.body, { TeacherRepository, userRepository, sendNotification })
        
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function homeworkget(req, res) {
    try {

        let result = await homeworkgetUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function homeworkdelete(req, res) {
    try {

        console.log(req.body)

        let result = await homeworkdeleteUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function exam(req, res) {
    try {

        console.log(req.body)

        let result = await examUseCase(req.body, { TeacherRepository,sendNotification  })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function examget(req, res) {
    try {
        let result = await examgetUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
async function examdelete(req, res) {
    try {
        let result = await examdeleteUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}










async function point(req, res) {
    try {
        let result = await pointUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



async function pointadd(req, res) {
    try {
        let result = await pointaddUseCase(req.body, { TeacherRepository, sendNotification })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function deletee(req, res) {
    try {
        let result = await deleteeUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}



async function classdeletee(req, res) {
    try {
        let result = await classdeleteeUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function attendanceRapor(req, res) {
    try {
        let result = await attendanceRaporUseCase(req.body, { TeacherRepository })

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=gunluk_rapor.pdf");
        res.status(200).send(result);


    } catch (error) {
        console.log(error)
        logyaz(error)
        res.status(400).json({ error: error })
    }
}
async function pointRapor(req, res) {
    try {
        let result = await pointRaporUseCase(req.body, { TeacherRepository })

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=gunluk_rapor.pdf");
        res.status(200).send(result);


    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}



async function mesajget(req, res) {
    try {
        let result = await mesajgetUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function mesajGetV2(req, res) {
    try {
      
        req.body.id = req.user.id
        let result = await mesajGetV2UseCase(req.body, { TeacherRepository })


        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}



async function homeworkpoint(req, res) {
    try {
        let result = await homeworkpointUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

async function homeworkpointadd(req, res) {
    try {
        let result = await homeworkpointaddUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function studentRapor(req, res) {
    try {
        let result = await studentRaporUseCase(req.body, { TeacherRepository })
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=puanraporogrenci.pdf");
        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

async function filecreae(req, res) {
    try {

         if(req.file != undefined) req.body.filename = req.file.filename
         else  res.status(400).json(false)

        let result = await filecreaeUseCase(req.body, { TeacherRepository })
        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function lessonAssignment(req, res) {
    try {



        let result = await lessonAssignmentUseCase(req.body, { TeacherRepository,sendNotification })
        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function lessonAssignmentGet(req, res) {
    try {



        let result = await lessonAssignmentGetUseCase(req.body, { TeacherRepository })
        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}



async function lessonAssignmentDelete(req, res) {
    try {
        let result = await lessonAssignmentDeleteUseCase(req.body, { TeacherRepository })
        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function attendanceIdareRapor(req, res) {
    try {
        let result = await attendanceIdareRaporUseCase(req.body, { TeacherRepository })
        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function attandanceWarning(req, res) {
    try {
        let result = await attandanceWarningUseCase(req.body, { TeacherRepository,sendNotification })
        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


async function homeworkPointAddV2(req,res) {
    try {

        let result = await homeworkPointAddV2UseCase(req.body,{TeacherRepository}) ;
        
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error)

        res.status(400).json({error:error.message})
    }
    
}


async function examPointAdd(req,res) {
    try {

        let result = await examPointAddUseCase(req.body,{TeacherRepository}) ;
        
        res.status(200).json(result)


       
        
    } catch (error) {
        console.log(error)

        res.status(400).json({error:error.message})
    }
    
}


async function examHomeworkTrialReport(req,res) {
    try {

        let pdfBuffer = await examHomeworkTrialReportUseCase(req.body, { TeacherRepository });
        
        // 1. Tarayıcıya bunun bir PDF olduğunu söyle
        res.setHeader('Content-Type', 'application/pdf');

        // 2. Dosya ismini ve davranışını belirle
        // 'attachment': Dosyayı direkt indirir.
        // 'inline': Dosyayı tarayıcıda açar (önizleme).
        // Genelde raporlar için 'attachment' tercih edilir.
        res.setHeader('Content-Disposition', 'attachment; filename=Ogrenci_Raporu.pdf');

        // 3. Dosya boyutunu bildir (Opsiyonel ama iyi bir pratiktir, loading bar için)
        res.setHeader('Content-Length', pdfBuffer.length);

        // 4. Veriyi gönder (json DEĞİL, send kullanıyoruz)
        res.send(pdfBuffer);
        
    } catch (error) {
        console.log(error)

        res.status(400).json({error:error.message})
    }
    
}

module.exports = { create,attandanceWarning,homeworkPointAddV2,examPointAdd, allTeacher,attendanceIdareRapor,lessonAssignmentGet,lessonAssignmentDelete,
    attendanceAddNew, schedule, dersler,mesajget,filecreae, attendance, attendanceadd, homeworkpoint, homeworkpointadd, homework,pointRapor, homeworkget, 
    homeworkdelete, exam, examget, examdelete, point, pointadd, deletee,classdeletee ,attendanceRapor, studentRapor, lessonAssignment, mesajGetV2,examHomeworkTrialReport}