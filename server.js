var express = require('express'),
    cart = require('./services/cart');
    inventory = require('./services/inventory');
 
var app = express();
 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cart');    
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
});

//item/inventory management 
app.get('/inventory/GetAllItems', inventory.GetAllItems);
app.get('/inventory/GetItemBySku/:sku', inventory.GetItemBySku);
app.post('/inventory/AddItemToInventory', express.bodyParser(), inventory.AddItemToInventory);
app.post('/inventory/RemoveItemFromInventory', express.bodyParser(), inventory.AddItemToInventory);
app.post('/inventory/UpdateItemQuanityInInventory', express.bodyParser(), inventory.UpdateItemQuanityInInventory);

//cart/item management 
app.get('/carts/GetCartByUserId/:UserId', cart.GetCartByUserId); // get current user's cart
app.post('/carts/AddItemToCart', express.bodyParser(), cart.AddItemToCart);
app.post('/carts/RemoveItemFromCart', cart.RemoveItemFromCart);
app.post('/carts/ChangeItemQuanityInCart', cart.ChangeItemQuanityInCart);
app.post('/carts/ClearExpiredCarts', cart.ClearExpiredCarts);
app.get('/carts/CheckoutCart/:CartId', cart.CheckoutCart); 
 
//provision/cleaning
app.get('/carts/ProvisionCarts', cart.ProvisionCarts);
app.get('/carts/ProvisionItems', cart.ProvisionItems);
app.get('/carts/RemoveCarts', cart.RemoveCarts);
app.get('/carts/findBySku/:id', cart.findBySku);
 
app.listen(3000);
console.log('Listening on port 3000...');