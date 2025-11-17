const trialRepository = require("./../../../infrastructure/db/trialRepository")
const schemaAddUseCase = require("./../../../use-cases/trial/schemaAdd")
const schemaGetUseCase = require("./../../../use-cases/trial/schemaGet")
const responseKeyUseCase = require("./../../../use-cases/trial/responseKey")
const responseKeyGetUseCase = require("./../../../use-cases/trial/responseKeyGet")
const trialGetUseCase = require("./../../../use-cases/trial/trialGet")
const trialResultGetUseCase = require("./../../../use-cases/trial/trialResultGet")
const trialPublicUseCase = require("./../../../use-cases/trial/trialPublic")
const trialDeleteUseCase = require("./../../../use-cases/trial/trialDelete")
const studentTrialGetUseCase = require("./../../../use-cases/trial/studentTrialGet")
const studentTrialGetOneUseCase = require("./../../../use-cases/trial/studentTrialGetOne")

const statisticsClassUseCase = require("./../../../use-cases/trial/statisticsClass")
const statisticsClassWebUseCase = require("./../../../use-cases/trial/statisticsClassWeb")

let statisticsSelectTrialUseCase = require("./../../../use-cases/trial/statisticsSelectTrial")
let statisticsGainUseCase = require("./../../../use-cases/trial/statisticsGain")











const schemaReadUseCase = require("./../../../use-cases/trial/schemaRead")
const trialReadAddUseCase = require("./../../../use-cases/trial/trialReadAdd")






async function schemaAdd(req, res) {
    try {

        let result = await schemaAddUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}



async function schemaGet(req, res) {
    try {

        let result = await schemaGetUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


async function schemaRead(req, res) {
    try {
        req.body.filename = req.file.filename

        let result = await schemaReadUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function responseKey(req, res) {
    try {
        req.body.filename = req.file.filename

        let result = await responseKeyUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
async function responseKeyGet(req, res) {
    try {


        let result = await responseKeyGetUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function trialReadAdd(req, res) {
    try {


        let result = await trialReadAddUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function trialGet(req, res) {
    try {


        let result = await trialGetUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function trialResultGet(req, res) {
    try {


        let result = await trialResultGetUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


async function trialPublic(req, res) {
    try {


        let result = await trialPublicUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function trialDelete(req, res) {
    try {


        let result = await trialDeleteUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
async function studentTrialGet(req, res) {
    try {


        let result = await studentTrialGetUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


async function studentTrialGetOne(req, res) {
    try {


        let result = await studentTrialGetOneUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


async function statisticsClass(req, res) {
    try {


        let result = await statisticsClassUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function statisticsSelectTrial(req, res) {
    try {


        let result = await statisticsSelectTrialUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function statisticsGain(req, res) {
    try {


        let result = await statisticsGainUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
async function statisticsClassWeb(req, res) {
    try {


        let result = await statisticsClassWebUseCase(req.body, { trialRepository })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = { schemaAdd,statisticsClassWeb, schemaGet,statisticsGain, schemaRead,responseKey,responseKeyGet,trialReadAdd,trialGet,trialResultGet,trialPublic,trialDelete,studentTrialGet, studentTrialGetOne,statisticsClass,statisticsSelectTrial }