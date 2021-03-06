var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json' //or 'text/plain'
};
  
module.exports.prepareResponse = function(req, cb) {
  var data = '';
  req.on('data', function(chunk) { data += chunk; });
  req.on('end', function() { cb(data); });
};

module.exports.respond = function(res, data, status = 200) {
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
};

module.exports.send404 = function(res) {
  exports.respond(res, 'Not Found', 404);
};

module.exports.redirector = function(res, loc, status = 302) {
  res.writeHead(status, { Location: loc });
  res.end();
};