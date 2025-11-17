

class TeacherEnity{
    constructor({AdSoyad,Cinsiyet,DogumTarihi,TCKimlikNo,Telefon,Eposta,Bolum,photo}){
        if(!AdSoyad || AdSoyad == 'undefined' || AdSoyad == 'null') throw new Error("ad ve soyad girilmemiş")
        if(!TCKimlikNo || TCKimlikNo == 'undefined' || TCKimlikNo == 'null') throw new Error("Tc Kimlik NO Girilmemiş tttccc")
        if(!Telefon || Telefon == 'undefined' || Telefon == 'null')  throw new Error("Telefon Girilmemiş")
        if(!Eposta || Eposta == 'undefined' || Eposta == 'null') throw new Error("E-POSTA ")
        if(!Bolum || Bolum == 'undefined' || Bolum == 'null') throw new Error("Bolum girilmemiş")
        if(!DogumTarihi  || DogumTarihi == 'undefined' || DogumTarihi == 'null') throw new Error("Doğum Tarihi Girilmemiş")
        
        
        



        this.AdSoyad = AdSoyad
        this.Cinsiyet = Number(Cinsiyet)
        this.DogumTarihi = DogumTarihi
        this.TCKimlikNo = TCKimlikNo
        this.Telefon = Telefon
        this.Eposta = Eposta
        this.Bolum = Bolum
        this.Fotograf = photo
    }
}



module.exports = TeacherEnity


