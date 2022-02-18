const multer = require("multer");

//where to store our file = images, videos. text files anything
const storage12 = multer.diskStorage({
  // where and with what name
  destination: function (req, file, cb) {
    cb(null, "./public"); // where files is foldername
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const filter = function (req, file, cb) {
  if ((file.minetype == "image/png", "image/jpg")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage12 });
module.exports = upload;
