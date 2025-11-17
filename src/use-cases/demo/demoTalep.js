async function demoTalep(data,{demoRepository}) {

    let result = await demoRepository.demoTalep(data)
    return result
    
}

module.exports = demoTalep