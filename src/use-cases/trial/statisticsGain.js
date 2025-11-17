async function statisticsGain(data, { trialRepository }) {

    let result = await trialRepository.statisticsGain(data)
    let result2;
    if (data.Sinif !== '-') {
        // 1. ÖNCE: İstenmeyenleri filtrele (henüz parse etmeden)
        result2 = result
            .filter(obj => obj.Sinif === data.Sinif)
            .map(obj => ({ // 2. SONRA: Sadece kalanları parse et
                ...obj,
                json: JSON.parse(obj.json)
            }));
    } else {
        // Filtreleme gerekmiyorsa, tümünü parse et (orijinal kodunuz)
        result2 = result.map(obj => ({
            ...obj,
            json: JSON.parse(obj.json)
        }));
    }

    const genelIstatistik = {};

    for (const obj of result2) {

        const gruplar = (obj.json).reduce((acc, item) => {
            acc[item.ders] = acc[item.ders] || {};
            acc[item.ders][item.kazanim] = acc[item.ders][item.kazanim] || {
                toplam: 0,
                dogru: 0,
                yanlis: 0,
                bos: 0,
            };

            acc[item.ders][item.kazanim].toplam++;

            if (item.sonuc == 1) {
                acc[item.ders][item.kazanim].dogru++;
            } else if (item.sonuc == 0) {
                acc[item.ders][item.kazanim].yanlis++;
            } else if (item.sonuc == 2) {
                acc[item.ders][item.kazanim].bos++;
            }
            return acc;
        }, {});

        obj.json = gruplar;




        const sinif = obj.Sinif;


        genelIstatistik[sinif] = genelIstatistik[sinif] || {};

        for (const ders in gruplar) {

            genelIstatistik[sinif][ders] = genelIstatistik[sinif][ders] || {};

            for (const kazanım in gruplar[ders]) {

                genelIstatistik[sinif][ders][kazanım] = genelIstatistik[sinif][ders][kazanım] || {
                    toplamDogru: 0,
                    toplamYanlis: 0,
                    toplamBos: 0,
                    toplamSoru: 0,
                    ogrenciSayisi: 0,
                };

                const k = gruplar[ders][kazanım];


                genelIstatistik[sinif][ders][kazanım].toplamDogru += k.dogru;
                genelIstatistik[sinif][ders][kazanım].toplamYanlis += k.yanlis;
                genelIstatistik[sinif][ders][kazanım].toplamBos += k.bos;
                genelIstatistik[sinif][ders][kazanım].toplamSoru += k.toplam;
                genelIstatistik[sinif][ders][kazanım].ogrenciSayisi++;
            }
        }
    }



    for (const sinif in genelIstatistik) {
        for (const ders in genelIstatistik[sinif]) {
            for (const kazanım in genelIstatistik[sinif][ders]) {

                const stats = genelIstatistik[sinif][ders][kazanım];

                if (stats.ogrenciSayisi > 0) {
                    stats.ortalamaDogru = stats.toplamDogru / stats.ogrenciSayisi;
                    stats.ortalamaYanlis = stats.toplamYanlis / stats.ogrenciSayisi;
                    stats.ortalamaBos = stats.toplamBos / stats.ogrenciSayisi;
                    stats.ortalamaToplamSoru = stats.toplamSoru / stats.ogrenciSayisi;



                    if (stats.toplamSoru > 0) {

                        const hamYuzde = (stats.toplamDogru / stats.toplamSoru) * 100;
                        stats.basariYuzdesi = parseFloat(hamYuzde.toFixed(2));

                    } else {
                        stats.basariYuzdesi = 0;
                    }





                } else {
                    stats.ortalamaDogru = 0;
                    stats.ortalamaYanlis = 0;
                    stats.ortalamaBos = 0;
                    stats.ortalamaToplamSoru = 0;
                }
            }
        }
    }






    return genelIstatistik
}

module.exports = statisticsGain