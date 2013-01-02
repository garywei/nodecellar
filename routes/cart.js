exports.findBySku = function(req, res) {
    console.log('findBySku');
    console.log(req.params.id);
    var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
        
    var ItemSchema = new Schema({
        Sku : String,
        Quanity : Number,
        Description : String,
        Carted : []
    });
    
    var ItemModel = mongoose.model('Item', ItemSchema);

    var ret;
    ItemModel.find({'Sku' : req.params.id}, function (err,items) {      
        res.send(items);
    })
};

exports.AddItemToCart= function(req, res) {
    var request = req.body; // cant get this to work. will mock up for now
    request = {
        Sku: 1234
        ,Quanity : 2
        ,CartId : '1'
    };
    console.log(request);
    
    require('../models/cart.js');
    require('../models/InventoryItem.js');
    var mongoose = require('mongoose')
      , CartModel = mongoose.model('Cart')
      , InventoryItemModel = mongoose.model('InventoryItem');
    
    CartModel.findOne({'hgId' : request.CartId}, function (err, cart) {
        if (cart && cart.Status === 'Active') {
            console.log(cart);
            InventoryItemModel.findOne({'Sku' : request.Sku}, function (err,item) {
                if (item){
                    console.log(item);
                    if (item.Quanity < request.Quanity) {
                        throw 'Insufficient item remaining in inventory';
                    }
                    else {
                        var lineItem = {Sku : request.Sku, Quanity : request.Quanity};
                        cart.LineItems.push(lineItem);
                        item.Quanity -= request.Quanity;
                        item.save(function (err, item) {
                            if (err) {// TODO handle the error
                                console.log('save failed');
                            }
                        });
                        cart.save(function (err, item) {
                            if (err) {// TODO handle the error
                                console.log('save failed');
                            }
                        });
                    }
                }
                else {
                    throw 'Invalid item sku';
                }
            });
        }
        else {
            throw 'Invalid cart Id!';
        }
    });
    
    res.send(request);
};

exports.ProvisionItems = function(req, res) {
    console.log('ProvisionItems');

    require('../models/InventoryItem.js');
    var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
    
    InventoryItemModel = mongoose.model('InventoryItem');
        
    var item2 = new InventoryItemModel({
            Sku : '1235'
            ,Quanity : 7
            ,Description : 'gift card'
            //,Carted : [{CartId : 1, Quanity : 3}, {CartId : 2, Quanity : 1}]
        });
    
    var item1 = new InventoryItemModel({
            Sku : '1234'
            ,Quanity : 5
            ,Description : 'glasses'
            //,Carted : [{CartId : 1, Quanity : 2}, {CartId : 2, Quanity : 3}]
        });
    

    InventoryItemModel.findOne({'Sku' : item1.Sku}, function (err,items) {
        if (items){
            console.log('Item Already exist');
        }
        else {
            item1.save(function (err, item1) {
                if (err) {// TODO handle the error
                    console.log('save failed');
                }
                else{
                    console.log('item saved');
                }
            });
        }
    });

    InventoryItemModel.findOne({'Sku' : item2.Sku}, function (err,items) {
        if (items){
            console.log('Item Already exist');
        }
        else {
            item2.save(function (err, item2) {
                if (err) {// TODO handle the error
                    console.log('save failed');
                }
                else{
                    console.log('item saved');
                }
            });
        }
    });
    res.send('Provision items completed');
};

exports.RemoveCarts = function(req, res){
    console.log('RemoveCarts');
    require('../models/cart.js');
    var mongoose = require('mongoose')
      , CartModel = mongoose.model('Cart');
      
    CartModel.find({}, function (err,carts) {
        for (var i = 0; i< carts.length; i++){
            var cart = carts[i];
            cart.remove(function(error, cart){
            });
        }
    });
    res.send('carts removed');
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