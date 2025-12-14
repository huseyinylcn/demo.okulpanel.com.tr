const sql = require("mssql")



let demoRepository = {

    async demoTalep(data) {
        try {
            let result = await new sql.Request()
                .input("ad",sql.NVarChar,data.ad)
                .input("soyad",sql.NVarChar,data.soyad)
                .input("email",sql.NVarChar,data.email)
                .input("telefon",sql.NVarChar,data.telefon)
                .input("kurumAdi",sql.NVarChar,data.kurumAdi)
                .input("ogrenciSayisi",sql.NVarChar,data.ogrenciSayisi)
                .input("mesaj",sql.NVarChar,data.mesaj)
                .query(`
                    INSERT INTO [dbo].[talep]
                        ([ad]
                        ,[soyad]
                        ,[email]
                        ,[telefon]
                        ,[kurumAdi]
                        ,[ogrenciSayisi]
                        ,[mesaj])
                    VALUES
                        (@ad
                        ,@soyad
                        ,@email
                        ,@telefon
                        ,@kurumAdi
                        ,@ogrenciSayisi
                        ,@mesaj
                        
                        )
                    `)
                    return true


        } catch (error) {
            throw new Error(`SQL HATA ${error.message}`)
        }
    }

}



module.exports = demoRepository