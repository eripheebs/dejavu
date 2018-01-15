// var React = require('react');
// var ReactDOM = require('react-dom');
// var HomePage = require('./HomePage.js');

// ReactDOM.render(<HomePage />, document.getElementById('main'));

import React from 'react';
import ReactDOM from 'react-dom';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('main')
);