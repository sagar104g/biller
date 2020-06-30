const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var config = require('./config/config');
var bill = require('./routes/bill');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/status', function (req, res) {
    res.json({ "status": "ok" });
});

app.use("/bill", bill);

app.use(function(req, res) {
    res.json({
    error: {
        'name':'Error',
        'status':404,
        'message':'Invalid Request',
        'statusCode':404
    }
    });
});

app.listen(config.port, function (err, res) {
    if(err){
        console.log(err);
    }else{
        console.log("server started ")
    }
});