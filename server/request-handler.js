/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var utils = require('./http-helpers.js');
// var http = require('http');
var url = require('url');
var path = require('path');
var results = [
// {
//   username: 'tester', //'app.username',
//   text: 'testing', // app.$message.val(),
//   roomname: 'lobby' //app.roomname || 
// }
];

// var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  
var actions = {
  'GET': function(req, res) {
    // http.get(req.url, (res) => {
    var parsedUrl = url.parse(req.url);
    var endPoint = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
    /* if your router needs to pattern-match endpoints
    */
    /*
     * DO SOMETHING - get asset, query database, etc. -> store as `data`
     * pass the result of that operation as data into responder -> store result status code as `statusCode`
     * pass the status code into responder
    */
    var data = {'results': results};
    
    endPoint === '/classes/messages' ? utils.respond(res, data) : utils.send404(res);
    // });
  },

  'POST': function(req, res) {
    utils.prepareResponse(req, function(data) {
      var parsedUrl = url.parse(req.url);
      var endPoint = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
      if (endPoint === '/classes/messages') {
        results.push(JSON.parse(data));
        utils.respond(res, results, 201);
      } else {
        utils.send404(res);
      }
      // Do something with the data that was just collected by the helper
      // e.g., validate and save to db
      // either redirect or respond
        // should be based on result of the operation performed in response to the POST request intent
        // e.g., if user wants to save, and save fails, throw error
    });
  }
};
//
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  // var statusCode = 200;

  // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end('Hello, World!');
// };

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


// module.exports = requestHandler;
  // IY comment: apparently it's convention to overwrite module.exports if only exporting one thing (fn, obj, etc.) but if there are more things, module.exports is an obj w key-value pairs


module.exports.requestHandler = function(req, res) {
  var action = actions[req.method];
  action ? action(req, res) : utils.send404(res);
};