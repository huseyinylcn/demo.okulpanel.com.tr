-- ogrenci otomatik ilk þifre oluþturma trigrý start

Alter TRIGGER trg_InsertAnaTablo
ON Ogrenciler
AFTER INSERT
AS
BEGIN
    INSERT INTO users (password, username, rol,id)
    SELECT 
        SUBSTRING(ISNULL(i.TCKimlikNo,''), 1, 4),  -- password
        i.OgrenciNumara,                             -- username
        '3',                                       -- rol
		i.OgrenciId
    FROM inserted i;
END;
-- ogrenci otomatik ilk þifre oluþturma trigrý stop



-- Ogretmen otomatik ilk þifre oluþturma trigrý start
ALTER TRIGGER trg_InsertAnaTabloOGRETMEN
ON Ogretmenler
AFTER INSERT
AS
BEGIN
    INSERT INTO users (password, username, rol,id)
    SELECT 
    
        SUBSTRING(ISNULL(i.TCKimlikNo,''), 1, 4),
        i.Eposta,
        '2',
		i.OgretmenID
    FROM inserted i;
END;
GO


-- Ogretmen otomatik ilk þifre oluþturma trigrý stop












CREATE PROCEDURE CheckUser
    @Username NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kullanýcý bilgilerini kontrol et
    IF EXISTS (
        SELECT 1
        FROM users
        WHERE username = @Username
          AND password = @Password
    )
    BEGIN
        -- Eðer doðruysa rol ve id bilgisini döndür
        SELECT id, rol
        FROM users
        WHERE username = @Username
          AND password = @Password;
    END
    ELSE
    BEGIN
        -- Hata mesajý döndür
        RAISERROR('Kullanýcý adý veya þifre hatalý.', 16, 1);
    END
END;


EXEC CheckUser @Username = '2636', @Password = 'ale3292';
