const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line
const path = require('path');
const router = require('./router');

const app = express();
const port = (process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(router);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App is listening on http://localhost:${port}`);
});

module.exports = { app };
