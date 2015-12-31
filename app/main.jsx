import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {RelayRouter} from 'react-router-relay';
import {createHistory} from 'history';
import routes from '../routes';
import CoffeeList from './components/CoffeeList';
//{queryKey:false}
ReactDOM.render(
  <RelayRouter history={createHistory()} routes={routes} />,
  document.getElementById('main')
);
