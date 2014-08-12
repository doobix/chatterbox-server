// var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var database = {};
database.results = [];

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

app.route('/classes/messages')
.get(function(req, res, next) {
  res.send(JSON.stringify(database));
})
.post(function(req, res, next) {
  // console.log("POST");
  // console.log(req.body);
  database.results.push(req.body);
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

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
