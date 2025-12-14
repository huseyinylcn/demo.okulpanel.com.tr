// src/infrastructure/jwtService.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}




const userRepository = require("./../db/userRepository")



function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Token hiç yoksa 401 hatası ver ve işlemi bitir.
    return res.status(401).json({ message: 'Token bulunamadı', code: "0x4401" });
  }

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) {


      return res.status(403).json({ message: 'Token geçersiz veya süresi dolmuş', code: "0x4401" });
    }

    let degistirmeTarihi = await userRepository.passwordChangeDateGet({ id: String(user.id), rol: String(user.rol) })
console.log({ id: String(user.id), rol: String(user.rol) })


    if (!user.time) {
      req.user = user;
      next()
    }

    if (!degistirmeTarihi[0].change ) {
      req.user = user;
      next()
    }



    let girisTarihi = new Date(user.time)


    if (degistirmeTarihi[0].change > girisTarihi) {
      return res.status(403).json({ message: 'Token geçersiz veya süresi dolmuş', code: "0x4401" });
    }
    req.user = user;
    next();

  });
}

module.exports = { generateToken, authenticateToken };
