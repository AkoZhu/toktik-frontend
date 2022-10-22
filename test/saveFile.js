const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const multer = require('multer');
const path = require("path");

const app = express();

let corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Save File to Local path
const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: '../public/images',
    filename: (req, file, cb) => {
        cb(null, "media" + randomString(8) + '_' + Date.now()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

const upload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|webp|mp4)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image or Video'))
        }
        cb(undefined, true)
    }
});

app.post("/save", upload.array('file[]'), (req, res) => {
    let files = [];
    for (let file of req.files) {
        files.push({
            filename: file.filename,
            type: file.mimetype.startsWith("image/") ? 0 : 1,
        });
    }

    res.send(
        {
            message: "Files were uploaded successfully!",
            file: files
        }
    )
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Running at ${PORT}.`);
});
