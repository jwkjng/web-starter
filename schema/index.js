var GraphQL       = require('graphql');
var GraphQLRelay  = require('graphql-relay');
var models        = require('./models');
var db            = require('./database');

var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId)
  if (idInfo.type == 'Store') {
    return db.getStore(idInfo.id)
  } else if(idInfo == 'Coffee') {
    return db.getCoffee(idInfo.id)
  }
  return null;
});

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
      type: GraphQLRelay.connectionDefinitions({name: 'Coffee', nodeType: coffeeType}).connectionType,
      args: {
        storeId: { type: GraphQL.GraphQLString }
      },
      resolve: function (store, args) {
        return GraphQLRelay.connectionFromArray(db.getCoffeeListByStore(args.storeId), args);
      }
    }
  }),
  interfaces: [nodeDefinitions.nodeInterface]
});

var coffeeType = new GraphQL.GraphQLObjectType({
  name: 'Coffee',
  description: 'A coffee item',
  isTypeOf: function(obj) { return obj instanceof models.Coffee },
  fields: () => ({
    id: GraphQLRelay.globalIdField('Coffee'),
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

// Types and queries are exported with GraphQLSchema
module.exports = new GraphQL.GraphQLSchema({
  query: queryType
});
