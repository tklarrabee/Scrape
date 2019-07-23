const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// const axios = require('axios');
// const cheerio = require('cheerio');

const indexRouter = require('./routes/index');
const scrapeRouter = require('./routes/scrape');

const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err, res) => {
  if(err) console.log('ERROR connecting to: ' + MONGODB_URI + '. ' + err)
  else console.log('Succeded connected to: ' + MONGODB_URI)
});
// app.use(express.static(path.join(__dirname, 'models')));


// view engine setup
const exphbs = require("express-handlebars");
app.set('views', path.join(__dirname, 'views'));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/scrape', scrapeRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
// app.listen(PORT, () => {
//   console.log("App running on port " + PORT + "!");
// });


module.exports = app;
