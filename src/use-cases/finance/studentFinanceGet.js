async function studentFinanceGet(data, {financeRepository,helperFunc}) {
    
    let result = await financeRepository.studentFinanceGet(data)

    // for(const obj of result){
    //     obj.ids = JSON.parse(obj.ids)
    // }
    return result
}


module.exports = studentFinanceGet