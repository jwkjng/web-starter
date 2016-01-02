var GraphQL       = require('graphql');
var GraphQLRelay  = require('graphql-relay');
var models        = require('./models');
var db            = require('./database');

/************************
 * Node Definitions
 ************************/
var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId)
  if (idInfo.type == 'Store') {
    return db.getStore(idInfo.id)
  } else if(idInfo == 'Coffee') {
    return db.getCoffee(idInfo.id)
  } else if(idInfo == 'Purchase') {
    return db.getPurchase(idInfo.id)
  }
  return null;
});

/************************
 * Object Types
 ************************/
var coffeeType = new GraphQL.GraphQLObjectType({
  name: 'Coffee',
  description: 'A coffee item',
  isTypeOf: function(obj) { return obj instanceof models.Coffee },
  fields: () => ({
  id: GraphQLRelay.globalIdField('Coffee'),
    storeId: {
      type: GraphQL.GraphQLString,
      description: 'The ID of the store'
   },
   name: {
     type: GraphQL.GraphQLString,
     description: 'The name of the coffee',
   },
   price: {
     type: GraphQL.GraphQLFloat,
     description: 'The price of the coffee'
   }
  }),
  interfaces: [nodeDefinitions.nodeInterface]
});

var purchaseType = new GraphQL.GraphQLObjectType({
  name: 'Purchase',
  description: 'A single purchase of coffee',
  isTypeOf: function(obj) { return obj instanceof models.Purchase },
  fields: () => ({
    id: GraphQLRelay.globalIdField('Purchase'),
    coffee: {
      type: coffeeType,
      description: 'Purchased coffee',
      resolve: (purchase) => db.getCoffee(purchase.coffeeId)
    }
  })
});

// Connection defintions for storeType
var storeCoffeesConnection = GraphQLRelay.connectionDefinitions({name: 'Coffee', nodeType: coffeeType});
var storePurchasesConnection = GraphQLRelay.connectionDefinitions({name: 'Purchase', nodeType: purchaseType});

var storeType = new GraphQL.GraphQLObjectType({
  name: 'Store',
  description: 'Coffee Store',
  isTypeOf: function(obj) { return obj instanceof models.Store },
  fields: () => ({
    id: GraphQLRelay.globalIdField('Store'),
    name: {
      type: GraphQL.GraphQLString,
      description: 'The name of the Store',
    },
    coffeeList: {
      description: 'A list of coffee items for a store',
      type: storeCoffeesConnection.connectionType,
      args: GraphQLRelay.connectionArgs,
      resolve: (store, args) => GraphQLRelay.connectionFromArray(db.getCoffeeListByStore(store.id), args)

    },
    purchases: {
      description: 'Purchased item list',
      type: storePurchasesConnection.connectionType,
      args: GraphQLRelay.connectionArgs,
      resolve: (store, args) => GraphQLRelay.connectionFromArray(db.getPurchasesByStore(store.id), args)
    }
  }),
  interfaces: [nodeDefinitions.nodeInterface]
});

/************************
 * Mutations
 ************************/
var buyCoffeeMutation = GraphQLRelay.mutationWithClientMutationId({
  name: 'BuyCoffee',
  inputFields: {
    coffeeId: { type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLID) }
  },
  outputFields: {
    store: {
      type: storeType,
      resolve: (payload) => {
        return db.getStore(payload.coffee.storeId);
      }
    },
    purchaseEdge: {
      type: storePurchasesConnection.edgeType,
      resolve: (payload) => {
        var purchases = db.getPurchasesByStore(payload.coffee.storeId);
        return {
          cursor: GraphQLRelay.cursorForObjectInConnection(purchases, payload.purchase),
          node: payload.purchase
        };
      }
    }
  },
  mutateAndGetPayload: (args) => {
    var coffeeId = GraphQLRelay.fromGlobalId(args.coffeeId).id;
    var purchase = db.buyCoffee(coffeeId);
    var coffee = db.getCoffee(coffeeId);
    return { purchase: purchase, coffee: coffee };
  }
});

/************************
 * Query Type
 ************************/
var queryType = new GraphQL.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeDefinitions.nodeField,
    store: {
      type: storeType,
      args: { storeId: { type: GraphQL.GraphQLString } },
      resolve: (root, args) => db.getStore(args.storeId)
    }
  })
});

/************************
 * Mutation Type
 ************************/
var mutation = new GraphQL.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    buyCoffee: buyCoffeeMutation
  })
});

module.exports = new GraphQL.GraphQLSchema({
  query: queryType,
  mutation: mutation
});
