import React from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './Login';
import HomePage from './HomePage';
import history from './history';

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={(props) => <HomePage {...props} />} />
      </div>
    </Router>
  );
}