import React from 'react';
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import CoffeeApp from './components/CoffeeApp'


ReactDOM.render(
  <Relay.RootContainer
    Component={CoffeeApp.Container}
    route={CoffeeApp.queries}
    onReadyStateChange={({error}) => { if (error) console.error(error); }} />,
  document.getElementById('main')
);
