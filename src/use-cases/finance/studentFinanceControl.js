async function studentFinanceControl(data,{financeRepository,helperFunc}) {
    let result = await financeRepository.studentFinanceControl(data)


    return result
    
}


module.exports = studentFinanceControl