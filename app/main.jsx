import React from 'react';
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import ConferenceApp from './components/ConferenceApp'


ReactDOM.render(
  <Relay.RootContainer
    Component={ConferenceApp.Container}
    route={ConferenceApp.queries}
    onReadyStateChange={({error}) => { if (error) console.error(error); }} />,
  document.getElementById('container')
);

// import Test from './test';

// ReactDOM.render(
//   <Test name="World!"/>,
//   document.body
// );
