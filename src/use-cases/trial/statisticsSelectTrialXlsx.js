

async function statisticsSelectTrialXlsx(data, { trialRepository,statisticsSelectTrialUseCase }) {
    console.log(data)
    let result = await statisticsSelectTrialUseCase(data,{trialRepository})



    
const desiredOrder = [
        "OgrenciNumara",
        "AdSoyad",
        "Sinif",
        "turkceNet",
        "sosyalNet",
        "dinNet",
        "ingilizceNet",
        "matematikNet",
        "fenNet",
        "toplamNet",
        "puan"
    
];


const orderedHeaders = desiredOrder;


const headerMap = {
    'OgrenciNumara': 'Öğrenci No',
    'AdSoyad': 'Ad ve Soyad',
    'Sinif': 'Sınıf',
    'turkceNet': 'Türkçe Net',
    'sosyalNet': 'Sosyal Net',
    'dinNet': 'Din Kültürü Net',
    'ingilizceNet': 'İngilizce Net',
    'matematikNet': 'Matematik Net',
    'fenNet': 'Fen Net',
    'toplamNet': 'Toplam Net',
    'puan': 'Puan',
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


module.exports = statisticsSelectTrialXlsx