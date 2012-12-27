var express = require('express'),
    wines = require('./routes/wines');
    cart = require('./routes/cart');
 
var app = express();
 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cart');    
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
});

app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.get('/carts/ProvisionCarts', cart.ProvisionCarts);
app.get('/carts/ProvisionItems', cart.ProvisionItems);
app.get('/carts/RemoveCarts', cart.RemoveCarts);
app.get('/carts/findBySku/:id', cart.findBySku);
 
app.listen(3000);
console.log('Listening on port 3000...');