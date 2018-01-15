import React from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './Login';
import HomePage from './HomePage';
import Callback from './Callback';
import Auth from './auth/auth';
import history from './auth/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={(props) => <Login auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <HomePage auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
      </div>
    </Router>
  );
}