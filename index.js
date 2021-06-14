var express = require("express");

var app = express();
var port = 3000

app.get("/", (req, res)=> {
    res.send("ok");
});

app.get("/test", (req, res)=> {
    res.send("status:200, message:ok");
});

app.get("/time", (req, res)=> {
    res.send("status:200, message:14:20");
});
app.listen(3000);