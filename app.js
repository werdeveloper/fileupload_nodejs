const express = require("express");
const app = express();
const { uploadImagesMulter } = require('./services/helper');

app.post("/upload", function (req, res) {
  let uploadPhotos = uploadImagesMulter.fields([
    {name: 'images', maxCount: 1},   // images is field name
    {name: 'images2', maxCount: 1}   // images2 is field name
  ]);
  uploadPhotos(req, res, function (err) {
    if(err){
      let message;
      if(err?.code=='LIMIT_FILE_SIZE') message = 'File size is toooo large.'; // File size error message
      if(err.code == 'LIMIT_UNEXPECTED_FILE') message = 'Only 1 file is allowed while browse the file.';  // Browse more than 1 file error message
      else message = err.message;
      return res.status(400).send({
        success: false,
        message: message,
        payload_files: {},
        payload_body: req.body
      });    
    } 
    else {
      return res.status(200).send({
        success: true,
        message: 'Success',
        payload_files: req.files,
        payload_body: req.body
      });  
    }
  });    
});

app.listen(8080, () => console.log("Server started on 8080"));
