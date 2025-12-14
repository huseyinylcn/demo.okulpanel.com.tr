async function create(data, { financeRepository, helperFunc }) {

    let result = await financeRepository.create(data)


    let id = result[0].id;
    let taksit = data.tutar / data.taksit_sayisi;

    let tarih = data.baslangic_tarihi;

    for (let i = 1; i <= data.taksit_sayisi; i++) {
        
        if(i != 1) tarih = await helperFunc.sonrakiAy(tarih)
            
        let obj = {
            "finans_id": id,
            "taksit":i,
            "taksit_tutar":taksit,
            "taksit_tarihi":tarih,
            "extra": JSON.stringify([]),
            "durum":0,
            "odeme_tipi":null,
            "makbuz_no":null
        }
        let result2 = await financeRepository.create_detail(obj)
      


    }






    return result[0].id

}

module.exports = create


