var createError = require('http-errors');
var fs = require('fs');
var express = require('express');
var path = require('path');
const morgan=require('morgan')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var session=require('express-session');
const config=require('./config/config')
var indexRouter = require('./routes/index');
var trainerdashboardRouter=require('./routes/trainerdashboard')
var userdashboardRouter = require('./routes/userdashboard');
var loginRouter = require('./routes/login');
var dashboardRouter=require('./routes/dashboard')
var exphbs = require('express-handlebars');
// var hbsd=require('express-handlebars')
var helpers = require('handlebars-helpers');
var hbs=require('hbs')
var multihelpers=helpers();
// models
var attendance=require("./models/attendance");
var User=require("./models/user");
// const Handlebars  = require('hbs');
const { equal } = require('assert');


hbs.registerHelper('eq', function (a, b, options) {
  if (a == b) { return options.fn(this); }
  return options.inverse(this);
});

hbs.registerHelper('noteq', function (a, b, options) {
  if (a != b) { return options.fn(this); }
  return options.inverse(this);
});
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
const expresshbs=exphbs.create({
    helpers: multihelpers,
    
    extname: ".hbs",
    layoutsDir:  path.join(__dirname, 'views'),
    defaultLayout: "layout"
})
// express app specific code
var app = express();
// connecting mongo
require("./db/conn");

// view engine setup
app.engine(
  "handlebars",expresshbs.engine
  
);

var partial=hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('tiny'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({secret:config.sessionSecret,
  resave: true,
  saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/userdashboard', userdashboardRouter);
app.use('/login', loginRouter);
app.use("/dashboard",dashboardRouter);
app.use('/trainerdashboard',trainerdashboardRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
