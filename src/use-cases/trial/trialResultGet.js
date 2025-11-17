async function trialResultGet(data,{trialRepository}) {
    let result = await trialRepository.trialResultGet(data)
    console.log(result.length)
    let control = false
    if(result.length > 0){
        if((result[0].matematikDogru+ result[0].matematikYanlis + result[0].matematikBos) == 15) control = true
        if((result[1].matematikDogru+ result[1].matematikYanlis + result[1].matematikBos) == 15) control = true
        if((result[2].matematikDogru+ result[2].matematikYanlis +  result[2].matematikBos) == 15) control = true


        if((result[0].fenDogru+ result[0].fenYanlis+ + result[0].fenBos) == 15) control = true
        if((result[1].fenDogru+ result[1].fenYanlis+ + result[1].fenBos) == 15) control = true
        if((result[2].fenDogru+ result[2].fenYanlis+ + result[2].fenBos) == 15) control = true


        if(!control) return result

        for( let obj of result){
        let p = ((obj.matematikNet * 4) + (obj.fenNet * 4) + (obj.ingilizceNet * 1) + (obj.dinNet * 1) + (obj.sosyalNet * 1) + (obj.turkceNet * 4));

        let maks_net = 210;


        let nihaiPuan = 100 + ((p / maks_net) * 400);

        obj.puan = parseFloat(nihaiPuan.toFixed(2));
        }
    }
    return result
}


module.exports  = trialResultGet