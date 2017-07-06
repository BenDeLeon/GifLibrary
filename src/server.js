const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Loki = require("lokijs");
const http = require("http");
const bodyParser = require("body-parser");
//Get Local Helpers
const imageCleanup = require("./helpers/image-cleanup");
// Get Routes
const imageupload = require("./server/routes/imageupload");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//Point static path to dist
app.use("/images", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "dist")));
// Set our API routes
app.use("/imageupload", imageupload);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

//Get port from environement and stor in Express

const port = process.env.PORT || "3000";
app.set("port", port);

//Create HTTP server

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost: ${port}`));
imageCleanup();
