const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const http = require('http');
const COLLECTION_NAME = 'images';
const uploadHelper = require("../../helpers/upload-helper");
const db = uploadHelper.db;
const imageFilter = uploadHelper.imageFilter;
const loadCollection = uploadHelper.loadCollection;

router.post('/upload', uploadHelper.upload.single('file'), async(req, res) => {
  try {
    const col = await loadCollection(COLLECTION_NAME, db);
    const data = col.insert(req.file);
    db.saveDatabase();
    res.send(col.data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});
router.post('/remove', async(req, res) => {
  try {
    let requestItems = req.body.ImagesToRemove;
    const col = await loadCollection(COLLECTION_NAME, db);
    let deleteItem = [];
    for (item of requestItems) {
      let temp = col.findAndRemove({
        $loki: item
      });
    }
    db.saveDatabase();
    res.send(col.data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});
router.get('/gifs', async(req, res) => {
  try {
    const col = await loadCollection(COLLECTION_NAME, db);
    res.send(col.data);
  } catch (err) {
    res.sendStatus(400);
  }
});
module.exports = router;
