/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const { Model } = require('objection');
const cors = require('cors');

const routes = require('./app/routes');
const knex = require('./database/knex');
const middlewares = require('./app/http/middlewares');

dotenv.config({ path: '.env' });
Model.knex(knex);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(middlewares.me);

Object.keys(routes).map((route) => app.use('/api', routes[route]));

app.use((req, res) => {
  res.send('Api not found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
