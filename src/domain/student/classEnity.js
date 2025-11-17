class classEnity{
    constructor({SinifKodu,SinifAdi,Derslik,Devre}){
        if(!SinifKodu || !SinifAdi || !Derslik || !Devre) throw new Error("Bilgiler Eksik")

        this.SinifKodu = SinifKodu
        this.SinifAdi = SinifAdi
        this.Derslik = Derslik
        this.Devre = Devre
    }
}



module.exports = classEnity