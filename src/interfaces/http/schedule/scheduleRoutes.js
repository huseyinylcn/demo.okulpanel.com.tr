const router = require("express").Router()

const scheduleController = require("./scheduleController")
const jwtService = require("./../../../infrastructure/jwt/jwtService")


router.post("/create",jwtService.authenticateToken,scheduleController.create)
router.post("/getteacher",jwtService.authenticateToken,scheduleController.getteacher)
router.post("/get",jwtService.authenticateToken,scheduleController.getclass)

router.post("/delete",jwtService.authenticateToken,scheduleController.scheduleDelete)
router.post("/gain",jwtService.authenticateToken,scheduleController.gain)
router.post("/gainadd",jwtService.authenticateToken,scheduleController.gainadd)
router.post("/dersler",jwtService.authenticateToken,scheduleController.dersler)
router.post("/lesson/add",jwtService.authenticateToken,scheduleController.lessonadd)
router.post("/lesson/delete",jwtService.authenticateToken,scheduleController.lessondelete)
router.post("/couerse/student/add",jwtService.authenticateToken,scheduleController.courseStudentAdd)
router.post("/couerse/student/get",jwtService.authenticateToken,scheduleController.courseStudentget)
router.post("/couerse/student/delete",jwtService.authenticateToken,scheduleController.courseStudentdelete)
router.post("/gain/db/add",jwtService.authenticateToken,scheduleController.gaindbadd)
router.post("/gain/db/delete",jwtService.authenticateToken,scheduleController.gaindbdelete)
router.post("/class/group",jwtService.authenticateToken,scheduleController.classGroup)
router.post("/class/group/add",jwtService.authenticateToken,scheduleController.classGroupAdd)
router.post("/class/group/delete",jwtService.authenticateToken,scheduleController.classGroupDelete)
router.post("/gain/new/get",jwtService.authenticateToken,scheduleController.gainnewget)
router.post("/gain/new/add",jwtService.authenticateToken,scheduleController.gainnewadd)
router.post("/gain/new/delete",jwtService.authenticateToken,scheduleController.gainnewdelete)
router.post("/gain/registered/get",jwtService.authenticateToken,scheduleController.gainRegisteredGet)
router.post("/version",scheduleController.version)


















router.post("/schools",scheduleController.schools)





module.exports = router