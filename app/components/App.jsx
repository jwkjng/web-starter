import React from 'react'
import Relay from 'react-relay'

// Top-level Component
class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="home">
        <div>
          <h1>Header</h1>
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
        name
      }
    `
  }
});
