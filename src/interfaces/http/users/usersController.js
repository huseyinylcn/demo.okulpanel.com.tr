const userRepository = require("./../../../infrastructure/db/userRepository")
const verify = require("./../../../infrastructure/mail/verify")
const verifyTel = require("./../../../infrastructure/phone/verify")



const loginC = require("./../../../use-cases/users/login")
const createAdmin = require("./../../../use-cases/users/create")
const infoUser = require("./../../../use-cases/users/info")
const tokenUseCase = require("./../../../use-cases/users/token")
const mesajUseCase = require("./../../../use-cases/users/mesaj")
const { sendNotification } = require("./../../../infrastructure/middleware/fcm_token");

let mesajgetUseCase = require("./../../../use-cases/users/mesajget")
let birthdateCelebrateUseCase = require("./../../../use-cases/users/birthdateCelebrate")

let maininfoUseCase = require("./../../../use-cases/users/maininfo")
let passwordUpdateUseCase = require("./../../../use-cases/users/passwordUpdate")
const tokendeleteUseCase =  require("./../../../use-cases/users/tokendelete")


const passwordUpdateAdminUseCase =  require("./../../../use-cases/users/passwordUpdateAdmin")


const passwordForgetUseCase =  require("./../../../use-cases/users/passwordForget")

const jwtService = require("./../../../infrastructure/jwt/jwtService")





async function login(req,res) {
    try {
     
        let result = await loginC(req.body,{userRepository,jwtService})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
async function create(req,res) {
    try {

         if(req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"
       

        let result = await createAdmin(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

async function info(req,res) {
    try {
        let result = await infoUser(req.user,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


async function token(req,res) {
    try {
        let result = await tokenUseCase(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}



async function mesaj(req,res) {
    try {
        let result = await mesajUseCase(req.body,{userRepository,sendNotification})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}


async function mesajget(req,res) {
    try {
        let result = await mesajgetUseCase(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}


async function maininfo(req,res) {
    try {
        let result = await maininfoUseCase(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}

async function passwordUpdate(req,res) {

    try {
        req.body.id = req.user.id
        req.body.rol = req.user.rol
        let result = await passwordUpdateUseCase(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
    
}


async function tokendelete(req,res) {

    try {

        let result = await tokendeleteUseCase(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
    
}



async function passwordForget(req,res) {

    try {

        let result = await passwordForgetUseCase.passwordForget(req.body,{userRepository,verify})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
    
}

async function passwordForgetCodeVerify(req,res) {

    try {

        let result = await passwordForgetUseCase.passwordForgetCodeVerify(req.body,{userRepository})
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
    }
    
}

async function passwordUpdate2(req,res) {

    try {

        let result = await passwordForgetUseCase.paswordUpdate(req.body,{userRepository})
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
    }
    
}













async function passwordForgetST(req,res) {

    try {

        let result = await passwordForgetUseCase.passwordForgetSt(req.body,{userRepository,verifyTel})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
    
}


async function passwordForgetCodeVerifyST(req,res) {

    try {

        let result = await passwordForgetUseCase.passwordForgetCodeVerifyST(req.body,{userRepository})
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
    }
    
}




async function passwordUpdate3(req,res) {

    try {

        let result = await passwordForgetUseCase.paswordUpdateST(req.body,{userRepository})
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
    }
    
}



async function passwordUpdateAdmin(req,res) {

    try {

        let result = await passwordUpdateAdminUseCase(req.body,{userRepository})



        res.status(200).json(result)

    } catch (error) {
        console.log(error)
    }
    
}



async function birthdateCelebrate(req,res) {

    try {

        let result = await birthdateCelebrateUseCase(req.body,{userRepository,sendNotification})



        res.status(200).json(result)

    } catch (error) {
        console.log(error)
    }
    
}






module.exports = {login, passwordUpdateAdmin, birthdateCelebrate, create,info,token,mesaj,mesajget,maininfo,passwordUpdate,tokendelete,passwordForget,passwordForgetCodeVerify,passwordUpdate2,passwordForgetST, passwordForgetCodeVerifyST, passwordUpdate3}