async function trialResultGetXlsx(data,{ trialRepository,trialResultGetUseCase }) {
    let result = await trialResultGetUseCase(data,{trialRepository})

const desiredOrder = [
    'AdSoyad',
    'TCKimlikNo',
    'OgrenciNumara',
    'Sinif',

    'OgrenciId',
    'kitapcik',
    

    'turkceDogru', 'turkceYanlis', 'turkceBos',  'turkceNet',

    'sosyalDogru', 'sosyalYanlis', 'sosyalBos', 'sosyalNet',
    'dinDogru', 'dinYanlis', 'dinBos', 'dinNet',
    'ingilizceDogru', 'ingilizceYanlis', 'ingilizceBos', 'ingilizceNet',

    'matematikDogru', 'matematikYanlis', 'matematikBos', 'matematikNet',
    'fenDogru', 'fenYanlis', 'fenBos', 'fenNet',

    'toplamNet',
    'puan',
    
];


const orderedHeaders = desiredOrder;


const headerMap = {
    'AdSoyad': 'Ad Soyad',
    'TCKimlikNo': 'TC',
    'OgrenciNumara': 'Öğrenci No',
    'Sinif': 'Sınıf',
    'OgrenciId': 'Öğrenci İd',
    'kitapcik': 'Kitapçık No',
    'turkceDogru': 'Türkçe Doğru',
    'turkceYanlis': 'Türkçe Yanlış',
    'turkceBos': 'Türkçe Boş',
    'turkceNet': 'Türkçe Net',
    'sosyalDogru': 'Sosyal Doğru',
    'sosyalYanlis': 'Sosyal Yanlış',
    'sosyalBos': 'Sosyal Boş',
    'sosyalNet': 'Sosyal Net',
    'dinDogru': 'Din Kültürü Doğru',
    'dinYanlis': 'Din Kültürü Yanlış',
    'dinBos': 'Din Kültürü Boş',
    'dinNet': 'Din Kültürü Net',
    'ingilizceDogru': 'İngilizce Doğru',
    'ingilizceYanlis': 'İngilizce Yanlış',
    'ingilizceBos': 'İngilizce Boş',
    'ingilizceNet': 'İngilizce Net',
    'matematikDogru': 'Matematik Doğru',
    'matematikYanlis': 'Matematik Yanlış',
    'matematikBos': 'Matematik Boş',
    'matematikNet': 'Matematik Net',
    'fenDogru': 'Fen Doğru',
    'fenYanlis': 'Fen Yanlış',
    'fenBos': 'Fen Boş',
    'fenNet': 'Fen Net',
    'puan': 'Puan',
    'toplamNet': 'Toplam Net',
};

const displayHeaders = orderedHeaders.map(originalHeader => {
    return headerMap[originalHeader] || originalHeader;
});

const csvContent = [
    displayHeaders.join(','),

    ...result.map(row => {
        return orderedHeaders.map(header => {
            let value = row[header];
            
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                value = `"${value.replace(/"/g, '""')}"`; 
            } else if (value === null || value === undefined) {
                value = '';
            }
            
            return value;
        }).join(',');
    })
].join('\n'); 

 return csvContent 
}


module.exports = trialResultGetXlsx