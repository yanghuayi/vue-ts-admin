const express = require('express');
const app = express();

const mock = require('./mock/index');

mock(app);

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.sendFile('/index.html');
})

app.listen(8080, () => { console.log('Example app listening on port 8080!')  });