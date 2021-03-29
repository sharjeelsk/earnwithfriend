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