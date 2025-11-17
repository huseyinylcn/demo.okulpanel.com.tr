let demoRepository = require("./../../../infrastructure/db/demoRepository")
let demoTalepUseCase = require("./../../../use-cases/demo/demoTalep")



async function demoTalep(req,res) {
    try {

        let result = await demoTalepUseCase(req.body,{demoRepository})
        res.status(200).json(result)

    } catch (error) {

        res.status(400).json(error.message)
    }
    
}

module.exports = {demoTalep}