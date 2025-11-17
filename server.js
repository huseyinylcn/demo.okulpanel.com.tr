require("dotenv").config()
const connectDB = require("./src/config/database")
const app = require("./src/app")
const serviceAccount = require("./okulkocu-d8a73-firebase-adminsdk-fbsvc-f90cfdc3f3.json");
const {initFirebase} = require("./src/infrastructure/middleware/fcm_token");


initFirebase(serviceAccount)


const PORT = process.env.PORT || 80


connectDB().then(result => {
    console.log("Bağlantı Başarılı :)", true)
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })

}).catch(err => {
    console.log("Hata || Veri Tabanına Bağlanılamadı :(", err)
})