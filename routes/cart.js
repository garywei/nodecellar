exports.findAll = function(req, res) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/cart');    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    
    var kittySchema = mongoose.Schema({
        name: String
    });

    db.once('open', function callback () {
    });
    
    kittySchema.methods.speak = function () {
      var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name"
      console.log(greeting);
    }
    
    var Kitten = mongoose.model('Kitten', kittySchema);
    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"
    
    fluffy.save(function (err, fluffy) {
      if (err) // TODO handle the error
          fluffy.speak();
    });    
    res.send([{name:'ri'}]);
    db.close();
};

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


exports.ProvisionItems = function(req, res) {
    console.log('ProvisionItems');

    var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
        
    var ItemSchema = new Schema({
        Sku : String,
        Quanity : Number,
        Description : String,
        Carted : []
    });
    
    var ItemModel = mongoose.model('Item', ItemSchema);
    
    var item2 = new ItemModel({
            Sku : '1235',
            Quanity : 7,
            Description : 'gift card',
            Carted : [{CartId : 1, Quanity : 3}, {CartId : 2, Quanity : 1}]
        });
    
    var item1 = new ItemModel({
            Sku : '1234',
            Quanity : 5,
            Description : 'glasses',
            Carted : [{CartId : 1, Quanity : 2}, {CartId : 2, Quanity : 3}]
        });
    
    item1.save(function (err, item1) {
      if (err) // TODO handle the error
          console.log('save failed');
    });    
    
    item2.save(function (err, item2) {
      if (err) // TODO handle the error
          console.log('save failed');
    });
    
    ItemModel.find(function (err,items) {
      //console.log(items);
        res.send(items);
    })
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

    CartModel.find({'hgId' : cart1.hgId}, function (err,items) {
        if (items.length>0){
            res.send(items);
        }
        else{
            cart1.save(function (err, cart1) {
              if (err) // TODO handle the error
                  console.log('save failed');
            });            
        }
    })
    
    CartModel.find({'hgId' : cart2.hgId}, function (err,items) {
        if (items.length>0){
            res.send(items);
        }
        else{
            cart2.save(function (err, cart1) {
              if (err) // TODO handle the error
                  console.log('save failed');
            });            
        }
    })
    
};