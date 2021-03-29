require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const path = require("path")
const app = express();
app.use(cors())
const userRoute = require("./api/routes/user")
const adminRoute = require("./api/routes/admin")

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');

    res.header('Access-Control-Allow-Credentials', true);
    res.header("preflightContinue", false)
  res.header("optionsSuccessStatus",204)
    next();
  });


mongoose.connect("mongodb+srv://admin:admin@123@cluster0.abisk.mongodb.net/Earnwithfriends?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.set("useCreateIndex", true);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("successfully connected to mongodb atlas database")
})

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// CORS


app.use("/user", userRoute);
app.use("/admin", adminRoute);

if(process.env.NODE_ENV ==="production"){
    app.use(express.static("client/build"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}




module.exports = app;