// cart schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema


var InventoryItemSchema = new Schema({
    Sku : String
  , Quanity : Number
  , Description : String
  , Carted : []
  , CreatedDate  : {type : Date, default : Date.now}
  , ModifiedDate  : {type : Date, default : Date.now}
});

InventoryItemSchema.path('Sku').validate(function (Sku) {
  return Sku.length > 0
}, 'Sku cannot be blank')


mongoose.model('InventoryItem', InventoryItemSchema);
