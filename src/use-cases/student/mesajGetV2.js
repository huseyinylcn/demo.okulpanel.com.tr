
async function mesajGetV2(data,{StudentRepository}) {
    data.id = String(data.id)
    let result = await StudentRepository.mesajGetV2(data)

 




const gruplanmisMesajlarGelen = result[0].reduce((gruplar, mesaj) => {
    
    const id = mesaj.gonderenID; 

  
    const gruptakiExtraVeri = {
        adSoyad: mesaj.AdSoyad,          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
         permit:1,
        aliciTipi:"teacher",
        AliciID: String(mesaj.gonderenID) 
   
    };
    
    if (!gruplar[id]) {
        gruplar[id] = {
            mesajlar: [],

            ...gruptakiExtraVeri 
        };
    }

    gruplar[id].mesajlar.push({ ...mesaj }); 

    return gruplar;
}, {});


const gruplanmisMesajlarGiden = result[1].reduce((gruplar, mesaj) => {
    
    const id = mesaj.AliciID; 

  
   const gruptakiExtraVeri = {
        adSoyad: mesaj.AdSoyad,          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
        permit:1,
        aliciTipi:"teacher",
        AliciID: String(mesaj.AliciID) 
    };
    
    if (!gruplar[id]) {
        gruplar[id] = {
            mesajlar: [],

            ...gruptakiExtraVeri 
        };
    }

    gruplar[id].mesajlar.push({ ...mesaj }); 

    return gruplar;
}, {});



const gruplanmisMesajlarSinif = result[2].reduce((gruplar, mesaj) => {
    
    const id = mesaj.AliciID; 


  
   const gruptakiExtraVeri = {
        adSoyad: mesaj.AdSoyad,          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
        permit:0,
        aliciTipi:"Sinif",
        AliciID: String(mesaj.gonderenID) 
    };
    
    if (!gruplar[id]) {
        gruplar[id] = {
            mesajlar: [],

            ...gruptakiExtraVeri 
        };
    }

    gruplar[id].mesajlar.push({ ...mesaj }); 

    return gruplar;
}, {});



const gruplanmisMesajlarAdminGiden = result[3].reduce((gruplar, mesaj) => {
    
    const id = mesaj.AliciID; 

  
 const gruptakiExtraVeri = {
        adSoyad: mesaj.AdSoyad,          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
        permit:1,
        aliciTipi:"admin",
        AliciID: String(mesaj.AliciID) 
    };
    
    if (!gruplar[id]) {
        gruplar[id] = {
            mesajlar: [],

            ...gruptakiExtraVeri 
        };
    }

    gruplar[id].mesajlar.push({ ...mesaj }); 

    return gruplar;
}, {});


const gruplanmisMesajlarAdminGelen = result[4].reduce((gruplar, mesaj) => {
    
    const id = mesaj.gonderenID; 

  
 const gruptakiExtraVeri = {
        adSoyad: mesaj.AdSoyad,          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
        permit:1,
        aliciTipi:"admin",
        AliciID: String(mesaj.gonderenID) 
    };
    
    if (!gruplar[id]) {
        gruplar[id] = {
            mesajlar: [],

            ...gruptakiExtraVeri 
        };
    }

    gruplar[id].mesajlar.push({ ...mesaj }); 

    return gruplar;
}, {});



function mesajGruplariniBirlestir(group1, group2,group3,group4, group5) {

    Object.keys(group1).forEach(id => {

        if (group2[id]) {

            group2[id].mesajlar = [
                ...group2[id].mesajlar,
                ...group1[id].mesajlar
            ];

        } else {
 
            group2[id] = group1[id];
        }
    });




        Object.keys(group5).forEach(id => {

        if (group4[id]) {

            group4[id].mesajlar = [
                ...group4[id].mesajlar,
                ...group5[id].mesajlar
            ];

        } else {
 
            group4[id] = group5[id];
        }
    });


    return {...group2, ...group3, ...group4};
}


let birlesmisSonuc = mesajGruplariniBirlestir(gruplanmisMesajlarGelen, gruplanmisMesajlarGiden, gruplanmisMesajlarSinif , gruplanmisMesajlarAdminGelen,gruplanmisMesajlarAdminGiden);
birlesmisSonuc = Object.values(birlesmisSonuc)








function tumMesajlariGuncelle(veriDizisi) {
    return veriDizisi.map(konusma => {

        if (!konusma.mesajlar || konusma.mesajlar.length === 0) {
            return {
                ...konusma, 
                sonMesajOzeti: "Mesaj yok",
                sonMesajTarih: "-"
            };
        }

        const siraliMesajlar = konusma.mesajlar.slice().sort((a, b) => {

            const tarihA = new Date(a.tarih);
            const tarihB = new Date(b.tarih);
            
            return tarihB - tarihA; 
        });

        const enYeniMesaj = siraliMesajlar[0];
        
        const ilk15Karakter = enYeniMesaj.mesaj.substring(0, 30)
        
        return {
            ...konusma, 
            sonMesajOzeti: ilk15Karakter,
            sonMesajTarih: enYeniMesaj.tarih
        };
    });
}



const guncelVeri = tumMesajlariGuncelle(birlesmisSonuc);



    return  guncelVeri
    
}





module.exports = mesajGetV2