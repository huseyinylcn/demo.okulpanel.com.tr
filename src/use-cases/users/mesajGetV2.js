
async function mesajGetV2(data,{userRepository}) {
    data.id = String(data.id)
    let result = await userRepository.mesajGetV2(data)

 




const gruplanmisMesajlarGelen = result[0].reduce((gruplar, mesaj) => {
    
    const id = mesaj.gonderenID; 

  
    const gruptakiExtraVeri = {
        adSoyad: mesaj.AdSoyad,          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
        permit:1,
        aliciTipi:"student",
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
        aliciTipi:"student",
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



const gruplanmisMesajlarOgretmen = result[2].reduce((gruplar, mesaj) => {
    
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



const gruplanmisMesajlarSinif = result[3].reduce((gruplar, mesaj) => {
    
    const id = mesaj.AliciID; 

  
 const gruptakiExtraVeri = {
        adSoyad: mesaj.AdSoyad,          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
        permit:1,
        aliciTipi:"Sinif",
        AliciID:String(mesaj.AliciID)
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



const gruplanmisMesajlarTumOgretmenler = result[4].reduce((gruplar, mesaj) => {
    
    const id = "allTeachersGroup"; 

  
 const gruptakiExtraVeri = {
        adSoyad: "Tüm Öğretmenler",          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
        permit:1,
        aliciTipi:"allteacher",
        AliciID:"-"
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



const gruplanmisMesajlarTumOgrenciler = result[5].reduce((gruplar, mesaj) => {
    
      const id = "allStudentsGroup"; 

  
 const gruptakiExtraVeri = {
        adSoyad: "Tüm Öğrenciler",          
        Sinif: mesaj.Sinif,             
        OgrenciNumara: mesaj.OgrenciNumara,
        permit:1,
        aliciTipi:"allstudent",
        AliciID:String("-")
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

function mesajGruplariniBirlestir(group1, group2,group3,group4,group5,group6) {

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


    return {...group2, ...group3, ...group4, ...group5, ...group6};
}


let birlesmisSonuc = mesajGruplariniBirlestir(gruplanmisMesajlarGelen, gruplanmisMesajlarGiden, gruplanmisMesajlarOgretmen , gruplanmisMesajlarSinif,gruplanmisMesajlarTumOgretmenler,gruplanmisMesajlarTumOgrenciler);
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
        
        const ilk15Karakter = enYeniMesaj.mesaj.substring(0, 30);
        
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