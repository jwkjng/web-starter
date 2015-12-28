import React from 'react'
import Relay from 'react-relay'

// Top-level Component
class CoffeeApp extends React.Component {
  render() {
    var coffeeList = this.props.store.coffeeList.edges;
    return (
      <div className="coffeeList">
        <h2>{this.props.store.name}</h2>
        {
          coffeeList.map(edge =>
            <ul>
              <Coffee key={edge.node.id} coffee={edge.node} />
            </ul>
          )
        }
      </div>
    );
  }
}

class Coffee extends React.Component {
  render() {
    var coffee = this.props.coffee;
    return (
        <li>
          <label>{coffee.name} - </label>
          <span>${coffee.price}</span>
          <div>{coffee.description}</div>
        </li>
    );
  }
}

exports.Container = Relay.createContainer(CoffeeApp, {
  initialVariables: {
    defaultStore: 1
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        name,
        coffeeList(defaultStore: $defaultStore) {
          edges {
            node {
              id,
              name,
              price
            }
          }
        }
      }
    `
  },
});

exports.queries = {
  name: 'CoffeeQueries',
  params: {},
  queries: {
    store: () => Relay.QL`query { store }`
  },
}
