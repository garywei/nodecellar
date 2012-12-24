var express = require('express'),
    wines = require('./routes/wines');
    cart = require('./routes/cart');
 
var app = express();
 
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.get('/carts', cart.findAll);
app.get('/carts/:id', cart.findById);
app.get('/carts/item', cart.item);
 
app.listen(3000);
console.log('Listening on port 3000...');