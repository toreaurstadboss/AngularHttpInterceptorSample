const express = require('express');
const path = require('path');
const fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var towns = require('./server/routes/towns');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'dist/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
    if (!req.url.startsWith('/api')){
      req.url = '/api' + req.url;
    }
    console.log('got requst url: ' + req.url);
    console.log('Server handling request at Time:', new Date())
    next()
  })

// app.use('/', routes);
app.get('/api/towns', function(req, res) {
    let townsFileContents = fs.readFileSync(path.join(__dirname, 'server/data/townsandcities.json'), 'utf-8');
    let townsFound = JSON.parse(townsFileContents);
    console.log(townsFileContents);
    res.json(townsFound);
});

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var debug = require('debug')('server');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));

console.log('Listening on port: ' + app.get('port'));

module.exports = app;
