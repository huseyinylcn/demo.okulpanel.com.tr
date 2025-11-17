const router = require("express").Router()
const upload = require("./../../../infrastructure/middleware/upload")
const uploads = require("./../../../infrastructure/middleware/uploads")


const jwtService = require("./../../../infrastructure/jwt/jwtService")
const teacherController = require("./teacherController")


router.post("/create",jwtService.authenticateToken,upload.single("photo"),teacherController.create)
router.post("/allTeacher",jwtService.authenticateToken,teacherController.allTeacher)
router.post("/schedule",jwtService.authenticateToken,teacherController.schedule)
router.post("/dersler",jwtService.authenticateToken,teacherController.dersler)
router.post("/attendance",jwtService.authenticateToken,teacherController.attendance)
router.post("/attendanceadd",jwtService.authenticateToken,teacherController.attendanceadd)
router.post("/attendance/add",jwtService.authenticateToken,teacherController.attendanceAddNew)

router.post("/homework",jwtService.authenticateToken,uploads,teacherController.homework)
router.post("/homeworkget",jwtService.authenticateToken,teacherController.homeworkget)
router.post("/homeworkdelete",jwtService.authenticateToken,teacherController.homeworkdelete)
router.post("/exam",jwtService.authenticateToken,teacherController.exam)
router.post("/examget",jwtService.authenticateToken,teacherController.examget)
router.post("/examdelete",jwtService.authenticateToken,teacherController.examdelete)
router.post("/point",jwtService.authenticateToken,teacherController.point)
router.post("/point/add",jwtService.authenticateToken,teacherController.pointadd)
router.post("/delete",jwtService.authenticateToken,teacherController.deletee)
router.post("/class/delete",jwtService.authenticateToken,teacherController.classdeletee)
router.post("/attendanceRapor",jwtService.authenticateToken,teacherController.attendanceRapor)
router.post("/attendance/idare/rapor",jwtService.authenticateToken,teacherController.attendanceIdareRapor)

router.post("/point/rapor",jwtService.authenticateToken,teacherController.pointRapor)
router.post("/mesajget",jwtService.authenticateToken,teacherController.mesajget)
router.post("/homework/point",jwtService.authenticateToken,teacherController.homeworkpoint)
router.post("/homework/pointadd",jwtService.authenticateToken,teacherController.homeworkpointadd)
router.post("/studentRapor",jwtService.authenticateToken,teacherController.studentRapor)
router.post("/filecreae",jwtService.authenticateToken,upload.single("photo"),teacherController.filecreae)
router.post("/lesson/assignment",jwtService.authenticateToken,teacherController.lessonAssignment)
router.post("/lesson/assignment/get",jwtService.authenticateToken,teacherController.lessonAssignmentGet)
router.post("/lesson/assignment/delete",jwtService.authenticateToken,teacherController.lessonAssignmentDelete)
router.post("/attendance/warning",teacherController.attandanceWarning)


// 
























module.exports = router