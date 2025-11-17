

async function attendance(data,{StudentRepository}) {
        let result = await StudentRepository.attendance(data)
        return result
}


module.exports = attendance