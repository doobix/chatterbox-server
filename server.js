// var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// var database = {};
// database.results = [];
var database = require('./server/database');

var allowCrossDomain = function(req, res, next) {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("access-control-allow-headers", "content-type, accept");
  res.header("access-control-max-age", 10);

  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
}
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/', function() {
  express.static(__dirname + 'index.html');
});

app.route('/classes/messages')
.get(function(req, res, next) {
  // Local DB
  // res.send(JSON.stringify(database));

  // Mongo DB
  database.find(function(err, results) {
    res.send({results: results});
  });
})
.post(function(req, res, next) {
  // console.log("POST");
  // console.log(req.body);

  // Local DB
  // database.results.push(req.body);

  // Mongo
  var message = new database(req.body);
  message.save(function() {
    // console.log('Saved message');
  });
})

var port = process.env.PORT || 3000;
var url = process.env.URL || 'localhost';

var server = app.listen(port);
console.log('Magic happening at', url, 'on:', port);

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
