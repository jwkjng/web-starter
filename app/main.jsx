import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {RelayRouter} from 'react-router-relay';
import {createHashHistory} from 'history';
import routes from '../routes';
import CoffeeList from './components/CoffeeList';

ReactDOM.render(
  <RelayRouter history={createHashHistory({queryKey:false})} routes={routes} />,
  document.getElementById('main')
);
