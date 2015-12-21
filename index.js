var express = require('express');
var app = express();

app.use('/assets', express.static('dist'));

app.get('/', function (req, res) {
  res.send('Hello Index');
});

module.exports = function (options) {
  var server = app.listen(options.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    host = host === '::' ? '[::]' : host;
    console.log('Listening at http://%s:%s', host, port);
  });

  return server;
};
