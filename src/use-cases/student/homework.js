async function homework(data, { StudentRepository }) {


    let result = await StudentRepository.homework(data)

    const newResult = result.map(item => ({
        ...item,
        Fotograf: (() => {
            try {
                return Array.isArray(JSON.parse(item.Fotograf))
                    ? JSON.parse(item.Fotograf)
                    : [];
            } catch {
                return [];
            }
        })()
    }));
    console.log(newResult)
    return newResult


}

module.exports = homework