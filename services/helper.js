const multer = require("multer");   // for file upload
const fs = require('fs');   // File System

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {        
        var dirDocs = './uploads';
        if (!fs.existsSync(dirDocs)) {
            console.log(`Creating the uploads folder`);
            fs.mkdirSync(dirDocs, {
                recursive: true
            });
        }
        cb(null, dirDocs);
    },
    filename: (req, file, cb) => {
        // console.log('file',file);
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    // let fieldName;
    // for (const key in req?.files) {
    //     fieldName = key;
    // }    
    let originalName = file.originalname.split(".");    
    if ((file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "png") && (originalName.length < 3)) {
        cb(null, true);
    } else {
        return cb(new Error(`Only supported jpeg, jpg and png format image!!`), false);
    }
};

exports.uploadImagesMulter = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // for 10MB
    }
});
