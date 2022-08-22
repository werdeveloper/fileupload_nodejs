const express = require("express");
const app = express();

const multer = require("multer");   // for file upload

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");      // uploads is image upload folder path
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});
const maxSize = 10 * 1024 * 1024; // for 10MB
const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
            } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        },
        limits: { fileSize: maxSize }
});

// Route
app.post("/upload", upload.array("images"), function (req, res, next) {
    res.json({
      success: true,
      payload_files: req.files,
      payload_body: req.body
    });
});

app.listen(8080, () => console.log("Server started on 8080"));
