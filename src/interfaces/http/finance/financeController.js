
const financeRepository = require("./../../../infrastructure/db/financeRepository")
const createUseCase = require("./../../../use-cases/finance/create")
const studentFinansesUseCase = require("./../../../use-cases/finance/studentFinanses")
const spacialLessonAddUseCase = require("./../../../use-cases/finance/spacialLessonAdd")
const studentSpaacialGetUseCase = require("./../../../use-cases/finance/studentSpaacialGet")
const studentFinanceGetUseCase = require("./../../../use-cases/finance/studentFinanceGet")
const paymentUseCase = require("./../../../use-cases/finance/payment")

const spacialLessonMenthDetailUseCase = require("./../../../use-cases/finance/spacialLessonMenthDetail")

const spacialLessonGetUseCase = require("./../../../use-cases/finance/spacialLessonGet")
const spacialLessonDeleteUseCase = require("./../../../use-cases/finance/spacialLessonDelete")
const studentFinanceControlUseCase = require("./../../../use-cases/finance/studentFinanceControl")









const helperFunc = require("./../../../utils/helperFunc")




async function create(req,res) {
    try {

        let result = await createUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json({id:result})
    } catch (error) {
        res.status(400).json({error:error})
    }

}



async function studentFinanses(req,res) {
    try {

        let result = await studentFinansesUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}


async function spacialLessonAdd(req,res) {
    try {

        let result = await spacialLessonAddUseCase(req.body,{financeRepository,helperFunc,studentSpaacialGetUseCase})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}


async function studentSpaacialGet(req,res) {
    try {

        let result = await studentSpaacialGetUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}



async function studentFinanceGet(req,res) {
    try {

        let result = await studentFinanceGetUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}

async function payment(req,res) {
    try {

        let result = await paymentUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}



async function spacialLessonMenthDetail(req,res) {
    try {

        let result = await spacialLessonMenthDetailUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}

async function spacialLessonGet(req,res) {
    try {

        let result = await spacialLessonGetUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}


async function spacialLessonDelete(req,res) {
    try {

        let result = await spacialLessonDeleteUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}


async function studentFinanceControl(req,res) {
    try {

        let result = await studentFinanceControlUseCase(req.body,{financeRepository,helperFunc})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

}





module.exports = {create,studentFinanses,spacialLessonAdd,studentSpaacialGet,studentFinanceGet,payment,spacialLessonMenthDetail,spacialLessonGet,spacialLessonDelete,studentFinanceControl}