async function trialReadAdd(data,{trialRepository}) {

    
let resultId = await trialRepository.trialAdd(data)



data.data = data.data.map(obj=>{
    return {
        ...obj,
        json:JSON.stringify(obj.json),
        id:resultId,
        responseKeyName:obj.name
    }
})
let result = await trialRepository.trialReadAdd(data.data)

return result

 
}


module.exports = trialReadAdd





