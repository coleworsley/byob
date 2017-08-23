const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = (process.env.PORT || 3000);

const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const db = require('knex')(config);

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
