const xlsx = require("xlsx")
const helperfunc = require("./../../utils/helperFunc")



async function responseKey(data, { trialRepository }) {

    let sonuc = await trialRepository.responseKeyNameQuery(data)
    if(sonuc.sonuc == 0) return "0x001"

    const dosya = xlsx.readFile(`./uploads/${data.filename}`)

    let sayfaAdi = dosya.SheetNames[0]
    let sayfa = dosya.Sheets[sayfaAdi]

    let veri = xlsx.utils.sheet_to_json(sayfa, { defval: null });


    for (const key of veri) {
        
        let ders = await helperfunc.eslestir(key["Ders"])
        console.log(ders)
        console.log(key["Cevap"])
        console.log(key["A"])
        console.log(key["B"])
        console.log(key["Kazanım"])

        let schema = {
            ders:ders,
            sorusayisi:Number(key["A"]),
            kitapcik:"A",
            cevap:key["Cevap"],
            kazanim:key["Kazanım"],
            name:data.name


        }
        let schema2 = {
            ders:ders,
            sorusayisi:Number(key["B"]),
            kitapcik:"B",
            cevap:key["Cevap"],
            kazanim:key["Kazanım"],
            name:data.name


        }
        let result = await trialRepository.responseKey(schema)
        let result2 = await trialRepository.responseKey(schema2)



        
    }

    //
    return true
}



module.exports = responseKey