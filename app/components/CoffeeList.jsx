import React from 'react';
import Relay from 'react-relay';
import Coffee from './Coffee';

class CoffeeList extends React.Component {
  render() {
    var store = this.props.store;
    var coffeeList = store.coffeeList.edges;
    var purchases = store.purchases.edges;
    var total = 0.0;

    purchases.forEach(p => {
      if (!p.node) return;
      total += p.node.coffee.price;
    });
    return (
      <div className="coffeeStore">
        <h2>{store.name}</h2>
        <div>
          <span>Your items: </span>
          <ol>
            {purchases.map(edge => (
                <li key={edge.node.id}>{edge.node.coffee.name}</li>
            ))}
          </ol>
          <div>
            <span>Your Total: ${total}</span>
          </div>
        </div>
        <div className="coffeeList">
          <ul>
          {coffeeList.map(edge => (
            <Coffee key={edge.node.id} coffee={edge.node} store={store} />
          ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default Relay.createContainer(CoffeeList, {
  initialVariables: {
    storeId: 1
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        name,
        coffeeList(first: 100) {
          edges {
            node {
              ${Coffee.getFragment('coffee')}
            }
          }
        },
        purchases(first: 100) {
          edges {
            node {
              id,
              coffee {
                name,
                price
              }
            }
          }
        }
      }
    `
  },
});
