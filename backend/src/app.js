// Modules
const app = require('express')();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

// Custom Modules
const userRouter = require('./routers/user.js');
const loginRouter = require('./routers/login.js');

// Setup
app.use(expressValidator());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Routers
app.use(userRouter);
app.use(loginRouter);

// export app
module.exports = app;
