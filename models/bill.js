var taxes = require('../config/taxes');
var utils = require('../utils/utils');
var calculateBill = function(list){

    let promise = new Promise(function(resolve, reject){
        try{
            let receipt = [];
            let finalAmount = 0;
            for(item in list){
                let itemBill = {};
                let value = list[item];
                value['itemCategory'] = value['itemCategory'].toLowerCase();
                let breakPoint = taxes[value['itemCategory']+'BreakPoint'] ? taxes[value['itemCategory']+'BreakPoint'] : null;
                let combinedPrice = value['quantity']*value['price'];
                let finalCombinedPrice = 0;
                if(breakPoint && combinedPrice >= breakPoint ){
                    finalCombinedPrice = combinedPrice + combinedPrice*(taxes[value['itemCategory']+'Above']/100);
                }else{
                    finalCombinedPrice = combinedPrice + combinedPrice*(taxes[value['itemCategory']+'Below']/100);
                }
                finalAmount += finalCombinedPrice;
                itemBill[value['item']] = finalCombinedPrice;
                receipt.push(itemBill);
            }
            receipt.sort(utils.compare);
            if(finalAmount>taxes['discountBreakPoint']){
                finalAmount = finalAmount +finalAmount*(taxes['discountBelow']/100)
            }
            resolve([finalAmount,receipt]);
        }catch(err){
            reject(err);
        }
    })
    return promise;
}
exports.calculateBill = calculateBill;