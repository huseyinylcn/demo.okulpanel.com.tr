const fs = require('fs');
const readline = require('readline');




async function schemaAdd(data, { trialRepository }) {

    data.schema = JSON.stringify(data.schema)
    let result = await trialRepository.schemaAdd(data)

       return result
}


module.exports = schemaAdd