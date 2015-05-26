var _ = require('lodash');
var urlApi = require('url');

exports = module.exports;

var testUtils = exports;

testUtils.createRawRequest = function(headers, path) {
  var handlers = {};
  return {
    headers: headers,
    connection: {
      remoteAddress: 'localhost',
      remotePort: '35034'
    },
    resume: function() {
    },
    url: path != null ? path : '/path',
    on: function(event, handler) {
      if (handlers.event == null) {
        handlers.event = [];
      }
      handlers.event.push(handler);
    },
    trigger: function(event, data) {
      if (handlers.event != null) {
        var eventHandlers = handlers.event;
        _.forEach(eventHandlers, function(eventHandler) {
          eventHandler(data);
        });
      }
    }
  };
};

testUtils.createRequest = function(method, path, contentType) {
  var handlers = {};
  var entity = {};
  var queryParameters = {};
  if (contentType != null) {
    entity.mediaType = contentType;
  }
  if (path != null) {
    var urlParts = urlApi.parse(path, true);
    queryParameters = urlParts.query;
  }
  return {
    method: method,
    reference: {
      path: path
    },
    entity: entity,
    queryParameters: queryParameters,
    on: function(event, handler) {
      if (handlers[event] == null) {
        handlers[event] = [];
      }
      handlers[event].push(handler);
    },
    resume: function() {

    },
    trigger: function(event, data) {
      if (handlers[event] != null) {
        var eventHandlers = handlers[event];
        _.forEach(eventHandlers, function(eventHandler) {
          eventHandler(data);
        });
      }
    }
  };
};
