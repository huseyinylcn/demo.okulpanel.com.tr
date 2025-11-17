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
