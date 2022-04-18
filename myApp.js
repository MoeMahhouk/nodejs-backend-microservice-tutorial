var dotenv = require('dotenv').config();
const { equal } = require('assert');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');



app.use("/", (req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req,res) => {
    absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
    var msg = "Hello json";
    if(process.env.MESSAGE_STYLE === "uppercase") {
        msg = msg.toUpperCase();
    }
    res.json({
        message: msg
    });
});

app.get("/now", (req,res,next) => {
    req.time = new Date().toString();
    next()
}, (req, res) => {
    res.json({
        time: req.time
    });
});

app.get("/:word/echo", (req,res) => {
    res.json({
        echo: req.params.word
    });
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.route("/name")
.get((req,res) => {
    var {first: firstName, last: lastName} = req.query;
    res.json({
        name: `${firstName} ${lastName}`
    });
})
.post((req,res) => {
    var {first: firstName, last: lastName} = req.body;
    res.json({
        name: `${firstName} ${lastName}`
    });
});














module.exports = app;