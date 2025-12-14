







function calculateInstallmentTotals(lessonArray,date1) {

   
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

   
    const getGroupingData = (tarihStr) => {
        const tarih = new Date(tarihStr);
        
   
        const onDortGunGeri = new Date(tarih.getTime());
        onDortGunGeri.setDate(tarih.getDate() -date1);


        const year = onDortGunGeri.getFullYear();
        const month = onDortGunGeri.getMonth(); 


        const groupStartOfMonth = new Date(year, month, 1);
        

        const taksitTarihDate = new Date(groupStartOfMonth.getTime());
        taksitTarihDate.setDate(groupStartOfMonth.getDate() + date1);

        return {

            groupKey: formatDate(groupStartOfMonth), 
       
            taksitTarih: formatDate(taksitTarihDate) 
        };
    };

    const groupedResultsMap = lessonArray.reduce((acc, sf) => {
        // console.log(sf)
        
        const { groupKey, taksitTarih } = getGroupingData(sf.tarih);
        
       
        const key = `${groupKey}|${sf.OgrenciID}|${sf.finans_id}`;

        if (!acc.has(key)) {
            acc.set(key, {
                finans_id: sf.finans_id,
                OgrenciID: sf.OgrenciID,
                taksit_tutar: 0, 
                taksit_tarih: taksitTarih,
                ids:[]
            });
        }

       

        const currentGroup = acc.get(key);

        currentGroup.taksit_tutar += sf.ogrenci_ucret;
        currentGroup.ids.push(sf.id);

        

        return acc;
    }, new Map());


    return [...groupedResultsMap.values()];
}







async function spacialLessonAdd(data,{financeRepository,helperFunc,studentSpaacialGetUseCase}) {

let dizi  = []

let tarihler = await helperFunc.gunTarihBul(data.baslangicTarih,data.bitisTarih,data.Gun)
let obj;
for(let i = 0;i < tarihler.length;i++){

    obj = {
            "Ders":data.Ders,
            "DersSaati":data.DersSaati,
            "OgrenciID":data.OgrenciID,
            "OgretmenID":data.OgretmenID,
            "Gun":data.Gun,
            "tarih":tarihler[i],
            "ogrenci_ucret":data.OgrencidersUcreti,
            "ogretmen_ucret":data.OgretmendersUcreti,
            "finans_id":data.finans_id

    }
    

    let res = await financeRepository.spacialLessonAdd(obj)
    
    obj.id = res[0].id

    dizi.push(obj)
    
}

console.log("#########################################")

let ayinGunu;

if(data.currentMonthCheckbox){
    let startDate = await  financeRepository.studentSpacialGet_StartDate({id:data.OgrenciID})
    const tarihh = new Date(startDate[0].baslangic_tarihi);
    ayinGunu = tarihh.getDate() -1;
  
}else{
ayinGunu = parseInt(data.selectedDay) -1;
}










const finalResult = calculateInstallmentTotals(dizi,ayinGunu);



for(const obj2 of finalResult){

    obj2.ids = JSON.stringify(obj2.ids)
    await financeRepository.studentFinanceDetailUpdateOrInsert(obj2)
}





return finalResult
}



module.exports = spacialLessonAdd