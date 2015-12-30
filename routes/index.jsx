import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../app/components/App';
import CoffeeList from '../app/components/CoffeeList';
import storeQuery from '../queries/store';

function prepareCoffeeListParams(params, route) {
  return {
    ...params,
    defaultStore: params.defaultStore ? parseInt(params.defaultStore) : 1
  };
}

export default (
  <Route
    path="/"
    component={App}
    queries={storeQuery}>
    <IndexRoute
      component={CoffeeList}
      queries={storeQuery}
      prepareParams={prepareCoffeeListParams} />
    <Route
      path=":defaultStore"
      prepareParams={prepareCoffeeListParams}
      component={CoffeeList}
      queries={storeQuery} />
  </Route>
);
