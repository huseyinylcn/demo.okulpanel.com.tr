const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


const student = require("./interfaces/http/student/studentRoutes")
const teacher = require("./interfaces/http/teacher/teacherRoutes")
const schedule = require("./interfaces/http/schedule/scheduleRoutes")
const users = require("./interfaces/http/users/usersRoutes")
const demo = require("./interfaces/http/demo/demoRoutes")
const trial = require("./interfaces/http/trial/trialRoutes")



// const admin = require("./interfaces/http/admin/adminRoutes")
 

app.use("/api/student",student)
app.use("/api/teacher",teacher)
app.use("/api/schedule",schedule)
app.use("/api/user",users)
app.use("/api/demoTalep",demo)
app.use("/api/trial",trial)


// app.use("/admin",admin)




module.exports = app