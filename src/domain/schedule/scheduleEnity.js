



class scheduleEnity{
    constructor({Gun,DersSaati,OgretmenID,Sinif,Ders}){
        if(!Gun) throw new Error("Gun Girilmemiş")
        if(!DersSaati) throw new Error("DersSaati Girilmemiş")
        if(!OgretmenID) throw new Error("OgretmenID Girilmemiş")
        if(!Sinif) throw new Error("Sinif Girilmemiş")
        if(!Ders) throw new Error("Ders Girilmemiş")
        

        this.Gun = Gun
        this.DersSaati = DersSaati
        this.OgretmenID = OgretmenID
        this.Sinif = Sinif
        this.Ders = Ders

    

        
    }

}



module.exports = scheduleEnity