async function payment(data,{financeRepository,helperFunc}) {
    
    let result = await financeRepository.payment(data)
    return result
}



module.exports = payment