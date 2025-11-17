const scheduleEnity = require("./../../domain/schedule/scheduleEnity")


async function create(data,{scheduleRepository}) {
    let result = await new scheduleEnity(data)
    let resultDB = await scheduleRepository.scheduleCreate(result)
    return resultDB
}


module.exports = create