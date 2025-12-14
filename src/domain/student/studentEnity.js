


class StudentEnity{
    constructor({Sinif,OgrenciNumara,AdSoyad,TCKimlikNo,Cinsiyet,DogumTarihi,
        AnneAdSoyad,BabaAdSoyad,VeliDurum,Sag,Engel,AnneEgitim,BabaEgitim,AnneMeslek,BabaMeslek,SuregenRahatsizlik,AylikGelir,AnneTel,BabaTel,photo,ucretYok }){
        
        if (!AdSoyad || AdSoyad == 'null' || AdSoyad == 'undefined')                        throw new Error("Ad Soyad Girilmemiş")
        if (!OgrenciNumara  || OgrenciNumara == 'null' || OgrenciNumara == 'undefined')     throw new Error("Öğrenci Numarası Girilmemiş")
        if (!Sinif || Sinif == 'null' || Sinif == 'undefined')                              throw new Error("Sınıf Girilmemiş")
        if (!TCKimlikNo || TCKimlikNo == 'null' || TCKimlikNo == 'undefined')               throw new Error("Tc Kimlik No Girilmemiş")
        
        
        this.Sinif = Sinif
        this.OgrenciNumara = OgrenciNumara
        this.AdSoyad = AdSoyad
        this.BabaAdSoyad = BabaAdSoyad
        this.AnneAdSoyad = AnneAdSoyad
        this.TCKimlikNo = TCKimlikNo
        this.Cinsiyet = Number(Cinsiyet)
        this.DogumTarihi = DogumTarihi
        this.AnneEgitim = AnneEgitim
        this.BabaEgitim = BabaEgitim
        this.AnneMeslek = AnneMeslek
        this.BabaMeslek = BabaMeslek
        this.SuregenRahatsizlik = SuregenRahatsizlik
        this.AylikGelir = AylikGelir
        this.AnneTel = AnneTel
        this.BabaTel = BabaTel
        this.Engel = Engel
        this.VeliDurum = VeliDurum
        this.Sag = Sag
        this.photo = photo
        this.ucretYok = ucretYok



    }
}

module.exports = StudentEnity