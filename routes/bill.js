var express = require('express');
var router = express.Router();
var bill = require('../models/bill');

router.get('/get_bill', function (req, res) {
    
    if(req.body){
        bill.calculateBill(req.body).then(function(bill){
            let currentTime = new Date();
            let finalBill = {
                currentTime: currentTime,
                totalAmount: bill[0],
                bill: bill[1]
            }
            res.json(finalBill);
        }).catch(function(err){
            console.log(err);
            res.send("server error")
        })
    }else{
        res.send("Please send items in Lists");
    }
});

module.exports = router;
