async function spacialLessonMenthDetail(data,{financeRepository,helperFunc}) {

    let sorgu = ""

       if (!data.ids ) return []
    data.ids = JSON.parse(data.ids)


   if (!data.ids || data.ids.length === 0) return []
    for(const id of data.ids){
        sorgu += `${id},`
    }
    data.sorgu = sorgu.slice(0,-1);
    
    let result = await financeRepository.spacialLessonMenthDetail(data)
    return result
    
}



module.exports = spacialLessonMenthDetail



