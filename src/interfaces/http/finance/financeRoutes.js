const router = require("express").Router()

const financeController = require("./financeController")
const jwtService = require("./../../../infrastructure/jwt/jwtService")




router.post("/v1/create",jwtService.authenticateToken, financeController.create)
router.post("/v1/get/student/",jwtService.authenticateToken, financeController.studentFinanses)
router.post("/v1/add/lesson/spacial",jwtService.authenticateToken, financeController.spacialLessonAdd)
router.post("/v1/get/spacial/student",jwtService.authenticateToken, financeController.studentSpaacialGet)

router.post("/v1/get/finance/student",jwtService.authenticateToken, financeController.studentFinanceGet)
router.post("/v1/add/payment",jwtService.authenticateToken, financeController.payment)
router.post("/v1/get/spacial/lesson",jwtService.authenticateToken, financeController.spacialLessonMenthDetail)
router.post("/v1/get/student/spacial/lesson",jwtService.authenticateToken, financeController.spacialLessonGet)
router.post("/v1/delete/student/spacial/lesson",jwtService.authenticateToken, financeController.spacialLessonDelete)
router.post("/v1/get/student/finance/control",jwtService.authenticateToken, financeController.studentFinanceControl)






// 




   







module.exports = router