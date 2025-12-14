async function studentFinanses(data,{financeRepository,helperFunc}) {
    let result = await financeRepository.studentFinanses(data)

    return result
}



module.exports = studentFinanses



