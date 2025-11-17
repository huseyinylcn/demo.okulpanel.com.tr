

class attendanceEnity{
    constructor({Sinif,DersSaati,tarih}){
        if(!Sinif) throw new Error("Sinif Bilgisi Eksik Girilmiş")
        if(!DersSaati) throw new Error("Ders Saati Girilmemiş")
        if(!tarih) throw new Error("Ders Saati Girilmemiş")
        
            this.Sinif = Sinif
            this.DersSaati = DersSaati
            this.tarih = tarih


    }
}


module.exports = attendanceEnity