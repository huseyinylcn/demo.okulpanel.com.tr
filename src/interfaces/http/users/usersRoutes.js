const router = require("express").Router()
const usersController = require("./usersController")
const upload = require("./../../../infrastructure/middleware/upload")

const jwtService = require("./../../../infrastructure/jwt/jwtService")


router.post("/login",usersController.login)
router.post("/create",jwtService.authenticateToken,upload.single("photo"),usersController.create)
router.post("/info",jwtService.authenticateToken,usersController.info)
router.post("/token",jwtService.authenticateToken,usersController.token)
router.post("/token/delete",jwtService.authenticateToken,usersController.tokendelete)

router.post("/mesaj",jwtService.authenticateToken,usersController.mesaj)
router.post("/mesajget",jwtService.authenticateToken,usersController.mesajget)

router.post("/main/info",jwtService.authenticateToken,usersController.maininfo)



// Kullanıcı Kendi Hesabına Girerek Değiştirir
router.post("/password/update",jwtService.authenticateToken,usersController.passwordUpdate)



// admin tarafından güncellenir şifre
router.post("/password/update/admin",jwtService.authenticateToken,usersController.passwordUpdateAdmin)






// Öğretmen Şifremi Unuttum Start
router.post("/password/forget",usersController.passwordForget)
router.post("/password/verify",usersController.passwordForgetCodeVerify)
router.post("/password/update2",usersController.passwordUpdate2)
// Öğretmen Şifremi Unuttum Stop




// Öğrenci Şifremi Unuttum Start
router.post("/password/student/forget",usersController.passwordForgetST)
router.post("/password/student/verify",usersController.passwordForgetCodeVerifyST)
router.post("/password/update3",usersController.passwordUpdate3)


// Öğrenci Şifremi Unuttum Stop




router.post("/birthdate/celebrate",usersController.birthdateCelebrate)






module.exports = router









