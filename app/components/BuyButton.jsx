import React from 'react';
import Relay from 'react-relay';
import BuyCoffeeMutation from '../mutations/BuyCoffeeMutation';

class BuyButton extends React.Component {
  _handleBuy = () => {
    console.log('Buy clicked');
    Relay.Store.update(new BuyCoffeeMutation({
      coffee: this.props.coffee,
      store: this.props.store
    }));
  }

  render() {
    var coffee = this.props.coffee;
    return (
      <div>
        <button onClick={this._handleBuy}>Buy</button>
      </div>
    )
  }
}

export default Relay.createContainer(BuyButton, {
  fragments: {
    coffee: () => Relay.QL`
      fragment on Coffee {
        id,
        price,
        storeId
        ${BuyCoffeeMutation.getFragment('coffee')}
      }
    `,
    store: () => Relay.QL`
      fragment on Store {
        id,
        ${BuyCoffeeMutation.getFragment('store')}
      }
    `
  }
});
