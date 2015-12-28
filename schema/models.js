'use strict';

function Store(id, name) {
  this.id = id;
  this.name = name;
}

function Coffee(id, storeId, name, price) {
  this.id = id;
  this.storeId = storeId;
  this.name = name;
  this.price = price;
}

module.exports = { Store: Store, Coffee: Coffee };
