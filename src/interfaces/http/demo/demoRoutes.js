const router = require("express").Router()
const demoController = require("./demoController")


router.post("/",demoController.demoTalep)




module.exports = router