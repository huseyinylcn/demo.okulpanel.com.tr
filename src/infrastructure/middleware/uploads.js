const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +path.extname(file.originalname));
  },
});

const uploads = multer({ storage }).array("images", 10); // en fazla 10 resim
//  cb(null, Date.now() + path.extname(file.originalname)); 
module.exports = uploads;