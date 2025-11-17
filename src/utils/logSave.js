const fs = require("fs");

function logYaz(mesaj) {
  const zaman = new Date().toISOString();
  const logSatiri = `[${zaman}] ${mesaj}\n`;

  fs.appendFile("app.log", logSatiri, (err) => {
    if (err) console.error("Log yazılamadı:", err);
  });
}


module.exports = logYaz