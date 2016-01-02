import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

// Top-level Component
class App extends React.Component {
  render() {
    const { children } = this.props;
    let storeName = this.props.store.name;
    let nextStoreId = (storeName === 'Fresh Brewed Coffee') ? '2' : '1';
    return (
      <div className="home">
        <div>
          <h1>Header</h1>
          <Link to={`/${nextStoreId}`}>Go to Store {nextStoreId}</Link>
        </div>
        <div>
          { children }
        </div>
        <div>
          Footer
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        name
      }
    `
  }
});
