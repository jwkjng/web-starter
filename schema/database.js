'use strict';

var Store     = require('./models').Store;
var Coffee    = require('./models').Coffee;

/**
 * Data stubs
 */
var stores = [
  new Store(1, 'Fresh Brewed Coffee'),
  new Store(2, 'Z-Coffee')
];

var coffeeList = [
  new Coffee(1, 1, 'Americano', 2.50),
  new Coffee(2, 1, 'Latte', 3.50),
  new Coffee(3, 1, 'Cappuccino', 3.50),
  new Coffee(4, 1, 'Mocha', 3.75),
  new Coffee(5, 2, 'Americano', 1.50),
  new Coffee(6, 2, 'Caramel Latte', 2.50),
  new Coffee(7, 2, 'Green Tea Latte', 2.50),
  new Coffee(8, 2, 'Mocha', 2.75)
];

module.exports.getStore = function getStore(id) {
  return stores.filter(function (store) {
    return store.id == id;
  })[0];
};

module.exports.getCoffee = function getCoffee(id) {
  return coffeeList.filter(function(coffee) {
    return coffee.id == id;
  })[0];
};

module.exports.getCoffeeListByStore = function getCoffeeListByStore(storeId) {
  var list = [];
  coffeeList.forEach(function(coffee) {
    if (coffee.storeId == storeId) {
      list.push(coffee);
    }
  });

  return list;
};
