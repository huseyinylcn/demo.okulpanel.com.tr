const router = require("express").Router()
const upload = require("./../../../infrastructure/middleware/upload")
const jwtService = require("./../../../infrastructure/jwt/jwtService")



const studentController = require("./studentController")



router.post("/create",jwtService.authenticateToken,upload.single("photo"), studentController.create)
router.post("/all",jwtService.authenticateToken, studentController.all)

router.post("/classadd",jwtService.authenticateToken, studentController.classAdd)
router.post("/classall",jwtService.authenticateToken, studentController.classAll)
router.post("/homework",jwtService.authenticateToken, studentController.homework)
router.post("/exam",jwtService.authenticateToken, studentController.exam)
router.post("/point",jwtService.authenticateToken, studentController.point)
router.post("/delete",jwtService.authenticateToken, studentController.deletee)
router.post("/filecre",jwtService.authenticateToken,upload.single("photo"), studentController.filecreate)
router.post("/mesajget",jwtService.authenticateToken, studentController.mesajget)





router.post("/attendance",jwtService.authenticateToken, studentController.attendance)







module.exports = router