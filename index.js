var express       = require('express');
var graphqlServer = require('express-graphql');
var path          = require('path');
var schema        = require('./schema');
var app           = express();

app.use('/graphql', graphqlServer({ schema: schema }));

app.use('/', express.static('dist'));

// handle every other route with index.html
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
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
