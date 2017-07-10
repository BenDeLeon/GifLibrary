const multer = require("multer");
const fs = require('fs');
const path = require('path');
const Loki = require('lokijs');
const DB_NAME = "db.json";
const crypto = require("crypto");
const db = new Loki(`./src/uploads/${DB_NAME}`, {
  persistenceMethod: 'fs'
});

const loadCollection = function(colName, db = Loki) {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      const _collection =
        db.getCollection(colName) || db.addCollection(colName);
      resolve(_collection);
    });
  });
};
const imageFilter = function(req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
// multer configuration
let storage = multer.diskStorage({
  destination: `./src/uploads/`,
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString("hex") + path.extname(file.originalname));
    });
  }
});
module.exports = {
  loadCollection: loadCollection,
  upload: multer({
    storage: storage
  }),
  db: new Loki(`./src/uploads/${DB_NAME}`, {
  persistenceMethod: 'fs'
})
};
