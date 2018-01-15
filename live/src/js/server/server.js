import path from 'path';
import { Server } from 'http';
import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import React from 'react';

import passport from 'passport';
import session from 'cookie-session';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config  from './config/database.js';
import passportConfig from './config/passportConfig.js';

import userHelpers from './routes/userHelpers.js';

import router from './routes/main';
import authRouter from './routes/auth';

const app = new Express();
const server = new Server(app);

mongoose.connect(config.url);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(Express.static(path.join(__dirname, './static')));

app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));

require('dotenv').load();

app.use(session({ secret: config.secret,
  resave: false,
  saveUninitialized: false,
  signed:false }));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

var routes = router(passport);
var authRoutes = authRouter(passport);

app.use('/', routes);
app.use('/auth', authRoutes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT;

const env = process.env.NODE_ENV || 'prod';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  userHelpers.setUpDb();
  console.info('Server running on http://localhost:'+ port + ' in ' + env);
});

module.exports = app;
