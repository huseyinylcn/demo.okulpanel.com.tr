// src/infrastructure/jwtService.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || '23211dasds';

function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}





function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Token hiç yoksa 401 hatası ver ve işlemi bitir.
    return res.status(401).json({ message: 'Token bulunamadı',code:"0x4401" });
  }

  // Bu fonksiyon asenkron çalıştığı için tüm response'lar (res)
  // ve bir sonraki adıma geçiş (next) bu callback'in içinde yönetilmelidir.
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      // Hata varsa (token geçersiz, süresi dolmuş vs.), burada 403 gönderilir
      // ve fonksiyonun bu kolu sonlanır.
      return res.status(403).json({ message: 'Token geçersiz veya süresi dolmuş',code:"0x4401" });
    }

    // Hata yoksa, kullanıcı bilgisi request'e eklenir ve bir sonraki middleware'e geçilir.
    req.user = user;
    next();
  });
}

module.exports = { generateToken,authenticateToken  };
