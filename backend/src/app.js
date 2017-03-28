// Modules
const app = require('express')();
const jwt = require('express-jwt');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

// Custom Modules
const userRouter = require('./routers/user.js');
const loginRouter = require('./routers/login.js');
const bookmarkRouter = require('./routers/bookmark.js');
const Config = require('./config.js');

// JWT Setup
const jwtMiddleware = jwt({ secret: Config.JWT_SECRET_KEY })
                        .unless({ path: ['/user', '/login'] });

// Setup
app.use(expressValidator());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(jwtMiddleware);

// Routers
app.use(userRouter);
app.use(loginRouter);
app.use(bookmarkRouter);

// export app
module.exports = app;
