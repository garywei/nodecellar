// cart schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema


var CartSchema = new Schema({
    hgId: {type : String}
  , UserId: {type : String}
  , Status: {type : String, default : 'Active', trim : true}
  , LineItems: [{Sku: String, Quanity: Number}] // Item sku, quantity, 
  , CreatedDate  : {type : Date, default : Date.now}
  , ModifiedDate  : {type : Date, default : Date.now}
});

CartSchema.path('UserId').validate(function (UserId) {
  return UserId.length > 0
}, 'User Id cannot be blank')

CartSchema.methods.CheckoutMe = function(){
  console.log('CheckoutMe');
  this.Status = 'Pending';
  this.ModifiedDate = new Date();
  this.save(function (err, cart) {
    if (err) {// TODO handle the error
      console.log('save failed');
    }
  });
  
  // make payments here. If successful, do the following
  this.LineItems = [];
  this.ModifiedDate = new Date();
  this.Status = 'Completed';
  this.save(function(err, cart){});
  
  //update inventory. if successful, do the following
  this.ModifiedDate = new Date();
  this.Status = 'Active';
  this.save(function(err, cart){});
    
  console.log(this.Status);
}

mongoose.model('Cart', CartSchema);
