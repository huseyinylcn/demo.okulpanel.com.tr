async function studentTrialGet(data,{trialRepository}) {
    let result = await trialRepository.studentTrialGet(data)

          let control = true
    if(result.length > 0){
        if((result[0].turkceDogru+ result[0].turkceYanlis + result[0].turkceBos ) > 15) control = false
       



      

        if(!control) return result

        for( let obj of result){
        let p = ((obj.MatNet * 4) + (obj.FenNet * 4) + (obj.IngilizceNet * 1) + (obj.DinNet * 1) + (obj.SosyalNet * 1) + (obj.TurkceNet * 4));

        let maks_net = 210;


        let nihaiPuan = 100 + ((p / maks_net) * 400);

        obj.SozelHamPuan = nihaiPuan;
        obj.SayisalHamPuan = 0

        
        }}


    return result
    
}

module.exports = studentTrialGet