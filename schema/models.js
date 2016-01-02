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

function Purchase(id, coffeeId) {
  this.id = id;
  this.coffeeId = coffeeId;
}

module.exports = {
  Store: Store,
  Coffee: Coffee,
  Purchase: Purchase
};
