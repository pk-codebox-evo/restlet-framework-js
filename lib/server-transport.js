'use strict';

var http = require('http');
var serverUtils = require('./server-utils');

exports = module.exports;

var transport = exports;

function createHttpServer(handler) {
  return http.createServer(function(rawRequest, rawResponse) {
    rawRequest.pause();
    var request = serverUtils.createRequest(rawRequest, 'http');
    var response = serverUtils.createResponse(rawResponse);
    handler(request, response);
  });
}

transport.createServer = function(serverConfiguration, handler) {
  if (serverConfiguration.protocol == 'http') {
    var server = createHttpServer(handler);

    server.listen(serverConfiguration.port, function() {
      console.log('Server listening on port '
        + serverConfiguration.port + '.');
    });

    return server;
  } else {
    throw new Error('The protocol '
      + serverConfiguration.protocol
      + ' isn\'t supported.');
  }
};