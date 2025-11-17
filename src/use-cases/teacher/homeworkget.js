async function homeworkget(data,{TeacherRepository}) {



    let result = await TeacherRepository.homeworkget(data)

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
    return newResult 
}

module.exports = homeworkget