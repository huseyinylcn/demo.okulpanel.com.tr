const fs = require('fs');
const readline = require('readline');
const iconv = require('iconv-lite');

async function schemaRead(data, { trialRepository }) {
    let veri = [];
    let havuz = []





    let dbSchema = await trialRepository.schemaGet(data);
    dbSchema = JSON.parse(dbSchema.schema);

    const filePath = `uploads/${data.filename}`;
    const readStream = fs.createReadStream(filePath).pipe(iconv.decodeStream('windows-1254'));

    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        let obj = {
            adSoyad:"",
            tc:"",
            okulno:"",
            Sinif:"",
            kitapcik:"",
            turkce:"",
            sosyal:"",
            din:"",
            ingilizce:"",
            matematik:"",
            fen:"",
            tel:"",
            name:"",
        };
        dbSchema.forEach(element => {
            let parca1 = line.slice(element.start, element.stop);
            if (element.name == 'okulno') parca1 = parca1.replace(/^0+/, '').trim();
            obj[element.name] = parca1;
        });

        // console.log(obj);



        if (
            obj.adSoyad.trim() ||
            obj.tc.trim() ||
            obj.okulno.trim() ||
            obj.Sinif.trim() ||
            obj.kitapcik.trim()
        ) {


            // const stData = await trialRepository.studentGet(obj);
            // console.log(stData)

            // if (stData == undefined || stData == null) {
            // havuz.push(obj)
            // } else {
            // let birlesmis = { ...obj, ...stData }
            veri.push(obj);
    

            // }

        }

    }

    let islenmisVeri = await trialRepository.trialRead(veri,data.cevapanahtari)

    islenmisVeri = islenmisVeri.map(obj => {
        // 1. Orijinal objenin tüm özelliklerini kopyala (...obj)
        // 2. 'json' özelliğinin üzerine, parse edilmiş halini yaz
        return {
            ...obj,
            json: JSON.parse(obj.json)
        };
    });

    return islenmisVeri;
}

module.exports = schemaRead;































