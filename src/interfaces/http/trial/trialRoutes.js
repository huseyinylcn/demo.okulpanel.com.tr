const router = require("express").Router()
const trialController = require("./trialController")
const jwtService = require("./../../../infrastructure/jwt/jwtService")
const upload = require("./../../../infrastructure/middleware/upload")





router.post("/schema/add",jwtService.authenticateToken,trialController.schemaAdd)
router.post("/schema/get",jwtService.authenticateToken,trialController.schemaGet)
router.post("/read",upload.single("txt"),jwtService.authenticateToken,trialController.schemaRead)


router.post("/response/key",upload.single("xlsx"),jwtService.authenticateToken,trialController.responseKey)
router.post("/response/key/get",jwtService.authenticateToken,trialController.responseKeyGet)

router.post("/result/get",jwtService.authenticateToken,trialController.trialResultGet)



router.post("/read/add",jwtService.authenticateToken,trialController.trialReadAdd)
router.post("/get",jwtService.authenticateToken,trialController.trialGet)
router.post("/public",jwtService.authenticateToken,trialController.trialPublic)
router.post("/delete",jwtService.authenticateToken,trialController.trialDelete)


router.post("/student/get",jwtService.authenticateToken,trialController.studentTrialGet)
router.post("/student/get/one",jwtService.authenticateToken,trialController.studentTrialGetOne )





router.post("/statistics/class",jwtService.authenticateToken,trialController.statisticsClass)
router.post("/statistics/class/web",jwtService.authenticateToken,trialController.statisticsClassWeb)

router.post("/statistics/select/trial",jwtService.authenticateToken,trialController.statisticsSelectTrial)
router.post("/statistics/gain",jwtService.authenticateToken,trialController.statisticsGain)














module.exports = router











