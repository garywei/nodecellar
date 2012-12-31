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


exports.ProvisionCarts = function(req, res) {
    console.log('ProvisionCarts');
    require('../models/cart.js');
    var mongoose = require('mongoose')
      , CartModel = mongoose.model('Cart');

    var cart1 = new CartModel({
        hgId : '1'
        ,UserId : 'UserId1'
        //,LineItems : [{Sku : 1234, Quanity : 2}, {Sku : 1235, Quanity : 3}]
    });
    
    var cart2 = new CartModel({
        hgId : '2'
        ,UserId : 'UserId2'
        //,LineItems : [{Sku : 1234, Quanity : 2}, {Sku : 1235, Quanity : 3}]
    });

    CartModel.findOne({'hgId' : cart1.hgId}, function (err,carts) {
        if (carts){
            console.log(carts);
        }
        else{
            cart1.save(function (err, cart1) {
                if (err) {// TODO handle the error
                    console.log('save failed');
                }
                else{
                    console.log('cart saved');
                }
            });            
        }
    })
    
    CartModel.findOne({'hgId' : cart2.hgId}, function (err,carts) {
        if (carts){
            console.log(carts);
        }
        else{
            cart2.save(function (err, cart1) {
                if (err) {// TODO handle the error
                    console.log('save failed');
                }
                else{
                    console.log('cart saved');
                }
            });            
        }
    })
    res.send('Provision carts completed');
    
};