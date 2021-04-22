var express = require('express');
const bodyparser = require("body-parser");
const connectDB = require('./database/connection');

// App start
var app = express();

app.use(express.json());

// Database Connection
connectDB();

// load routers
app.use('/', require('./router/router'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});