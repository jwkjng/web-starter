import React from 'react';
import Relay from 'react-relay';
import BuyButton from './BuyButton';

class Coffee extends React.Component {
  render() {
    var coffee = this.props.coffee;
    var store = this.props.store;
    return (
      <li>
        <label>{coffee.name} - </label>
        <span>${coffee.price}</span>
        <BuyButton key={coffee.id} coffee={coffee} store={store} />
      </li>
    );
  }
}

export default Relay.createContainer(Coffee, {
  fragments: {
    coffee: () => Relay.QL`
      fragment on Coffee {
        ${BuyButton.getFragment('coffee')}
        name,
        price
      }
    `,
    store: () => Relay.QL`
      fragment on Store {
        ${BuyButton.getFragment('store')}
      }
    `
  },
});
