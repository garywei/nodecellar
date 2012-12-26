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

exports.findById = function(req, res) {

    var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
        
    var ItemSchema = new Schema({
        Sku : String,
        Quanity : Number,
        Description : String,
        Carted : []
    });
    
    var CartSchema = new Schema({
        Id: {type : Number}
      , Status: {type : String, default : 'Active', trim : true}
      , LineItems: [] // Item sku, quantity, 
      , CreatedDate  : {type : Date, default : Date.now}
      , ModifiedDate  : {type : Date, default : Date.now}
    });
    
    var ItemModel = mongoose.model('Item', ItemSchema);
    var item = new ItemModel({
            Sku : '1234',
            Quanity : 5,
            Description : 'glasses',
            Carted : [{CartId : 1, Quanity : 2}, {CartId : 2, Quanity : 3}]
        });
    
    mongoose.connect('mongodb://localhost:27017/cart');    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
    });
    
    item.save(function (err, item) {
      if (err) // TODO handle the error
          console.log('save failed');
    });    

    res.send(item);
};


exports.ProvisionItems = function(req, res) {

    var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
        
    var ItemSchema = new Schema({
        Sku : String,
        Quanity : Number,
        Description : String,
        Carted : []
    });
    
    //var CartSchema = new Schema({
    //    Id: {type : Number}
    //  , Status: {type : String, default : 'Active', trim : true}
    //  , LineItems: [] // Item sku, quantity, 
    //  , CreatedDate  : {type : Date, default : Date.now}
    //  , ModifiedDate  : {type : Date, default : Date.now}
    //});
    
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
    
    mongoose.connect('mongodb://localhost:27017/cart');    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
    });
    
    item1.save(function (err, item1) {
      if (err) // TODO handle the error
          console.log('save failed');
    });    

    item2.save(function (err, item2) {
      if (err) // TODO handle the error
          console.log('save failed');
    });    

    res.send(item2);
};