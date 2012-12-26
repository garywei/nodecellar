// cart schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema


var CartSchema = new Schema({
    hgId: {type : String}
  , UserId: {type : String}
  , Status: {type : String, default : 'Active', trim : true}
  , LineItems: [] // Item sku, quantity, 
  , CreatedDate  : {type : Date, default : Date.now}
  , ModifiedDate  : {type : Date, default : Date.now}
});

CartSchema.path('UserId').validate(function (UserId) {
  return UserId.length > 0
}, 'User Id cannot be blank')


mongoose.model('CartModel', CartSchema)
