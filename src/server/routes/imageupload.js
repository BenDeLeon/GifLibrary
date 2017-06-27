const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const API = 'http://jsonplaceholder.typicode.com';
var formidable = require('formidable');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Loki = require('lokijs');
const http = require('http');
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'C:/Users/bdeleon/uploadImages';
const crypto = require('crypto');
const db = new Loki(`./src/uploads/${DB_NAME}`, { persistenceMethod: 'fs' });
const loadCollection = function (colName, db = Loki){
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        })
    });
}
const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
 // multer configuration

var storage = multer.diskStorage({
 destination: `./src/uploads/`,
   filename: function (req, file, cb) {

    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});
const upload =  multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);
        db.saveDatabase();
        // res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
        res.send({ Status: "Upload Successful"});

    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
    });
router.get('/gif-list', async (req, res) =>{
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        res.send(col.data);
    } catch (err) {
        res.sendStatus(400);
    }
});
module.exports = router;