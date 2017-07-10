const nconf = require("nconf"),
  fs = require("fs");

// Favor command-line arguments and environment variables.
nconf.env().argv();

// Check for a config file or the default location.

function Config() {
  nconf.argv().env();
  if ((path = nconf.get("conf"))) {
    nconf.file({ file: path });
  } else if (fs.statSync("./src/giphy.json")) {
    nconf.file({ file: "./src/giphy.json" });
  }
}
Config.prototype.get = function(key) {
  return nconf.get(key);
};

module.exports = new Config();
