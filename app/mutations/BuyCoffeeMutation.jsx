import Relay from 'react-relay';

export default class BuyCoffeeMutation extends Relay.Mutation {
  // Choose which mutation function to use
  getMutation() {
    return Relay.QL`mutation{buyCoffee}`;
  }
  // Define inputs to the mutation function
  getVariables() {
    return {
      coffeeId: this.props.coffee.id,
    };
  }
  // Define all query that represents every field to be affected by this mutation.
  // Not sure if I like the naming convention here :(
  getFatQuery() {
    return Relay.QL`
      fragment on BuyCoffeePayload {
        purchaseEdge,
        store {
          purchases,
          id
        }
      }
    `;
  }


  // Mutation configuration to hint Relay on how to handle the payload returned from the server.
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'purchases',
      edgeName: 'purchaseEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }

  // Optionally define optimistic updates until the server returns response
  // getOptimisticResponse() {
  //   return {
  //     purchaseEdge: {
  //       node: {
  //         id: this.props.coffee.id
  //       },
  //     },
  //     store: {
  //       id: this.props.store.id,
  //       purchases: this.props.purchases
  //     },
  //     coffee: {
  //       id: this.props.coffee.id
  //     }
  //   };
  // }

  // GraphQL query to be used by Relay
  static fragments = {
    coffee: () => Relay.QL`
      fragment on Coffee {
        id
      }
    `,
    store: () => Relay.QL`
      fragment on Store {
        id,
        purchases
      }
    `
  };
}
