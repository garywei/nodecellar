exports.GetAllItems = function(req, res) {
    console.log('GetAllItems');
    
    require('../models/InventoryItem.js');
    var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
    
    InventoryItemModel = mongoose.model('InventoryItem');
    
    InventoryItemModel.find({}, function (err,items) {
        console.log('items found');
        res.send(items);
    });

};

exports.GetItemBySku = function(req, res){
    console.log('GetItemBySku');
    require('../models/InventoryItem.js');
    var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    ,InventoryItemModel = mongoose.model('InventoryItem');
      
    InventoryItemModel.findOne({'Sku' : req.params.sku}, function (err,item) {
        console.log(item);
        if (item)
            res.send(item);
        else
            res.send('item with given sku not found');
    });
};

exports.AddItemToInventory= function(req, res) {
    var request = req.body;
    request = {Sku : '1236', Quanity : 50, Description : 'Vitamin water' };
    console.log(request);
    res.send('asfsdfa');
};
