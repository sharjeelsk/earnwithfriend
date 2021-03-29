//jshint esversion:6




const http = require("http");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const lodash = require("lodash");
// var nodemailer = require('nodemailer');
// const mongoose = require("mongoose");
// const multer = require("multer");
const app = require("./app")

const Port = process.env.PORT || 3002

const server = http.createServer(app)


server.listen(Port, function () {
    console.log("Server started on port 3002 http://localhost:3002/");
});