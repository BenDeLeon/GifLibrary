const fs = require('fs');
const path = require('path');
let imagePath = './src/uploads/';
let dbJson = `${imagePath}/db.json`;

let imageCleanup = () => {
  fs.watch(dbJson, {
    encoding: 'buffer'
  }, (eventType, filename) => {
    if (filename)
      fs.readFile(dbJson, function read(err, data) {
        if (err) {
          throw err;
        }
        content = JSON.parse(data);
        // Invoke the next step here however you like
        let arrayOfImages = new Set([]);
        for (image of content.collections[0].data) {
          arrayOfImages.add(image.filename);
        }
        fs.readdir(imagePath, function (err, files) {
          if (err) {
            throw err;
          }
          let setOfImages = new Set(files);
          let difference = new Set(
            [...setOfImages].filter(x => !arrayOfImages.has(x) && x.indexOf(".json") === -1)
          );
          for (files of difference) {
            let filesToDelete = path.join(imagePath, files);
            fs.unlink(filesToDelete, () => {
              console.log(`Removing ${filesToDelete}, not found in db.json`);
            });
          }
        });
      });
  });
};

module.exports = imageCleanup;
