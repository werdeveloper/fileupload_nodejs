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
const allowedFileType = ["image/png", "image/jpg", "image/jpeg"]; // Allowed the files
const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (allowedFileType.indexOf(file.mimetype) != -1) {
              cb(null, true);
            } 
            else {
              cb(null, false);
              return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        },
        limits: { fileSize: maxSize }
});

// Route
app.post("/upload",
upload.fields([
  {name: 'images', maxCount: 1},   // images is field name
  {name: 'images2', maxCount: 1}   // images2 is field name
]),
 function (req, res, next) {
    res.json({
      success: true,
      payload_files: req.files,
      payload_body: req.body
    });
});

app.listen(8080, () => console.log("Server started on 8080"));
