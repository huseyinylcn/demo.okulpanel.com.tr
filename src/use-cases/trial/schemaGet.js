async function schemaGet(data, { trialRepository }) {
    let result = await trialRepository.schemaGetAll(data)

    // result = result.map(ele => ({
    //     ...ele,
    //     schema: JSON.parse(ele.schema)
    // }))
    return result
}

module.exports = schemaGet