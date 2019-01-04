var http = require('http');
var url = require('url');
var { StringDecoder } = require('string_decoder');

const port = 3000;

var server = http.createServer(function (req, res) {
    // Get the url and parse it
    let parsedUrl = url.parse(req.url, true);

    // Get the path from url
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    let queryStringObject = parsedUrl.query;

    // Get the HTTP method
    let method = req.method.toLowerCase();

    // Get the headers as an object
    let headers = req.headers;

    // Get the payload, if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        //Choose the handler this request should go to
        //If one is not found, use 404 as the default
        var choosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // Route the request to the handler specified in the router
        choosenHandler(data, function (statusCode, payload) {
            // use the status code called back by the handler, or default to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // use the payload called by the handler, or default to an empty object
            payload = typeof (payload) == 'object' ? payload : {};

            // convert payload to a string
            var payloadString = JSON.stringify(payload);

            // return the response
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('Returning this response: ', statusCode, payloadString);
        });
    });
});

server.listen(port, function () {
    console.log(`The server is listening on ${port} now`);
});

// Define the handlers
var handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
    // Callback a http status code, and a payload object
    callback(406, { 'name': 'sample handler', 'payload': data.payload });
};

handlers.fugazzi = function (data, callback) {
    callback(407, { 'name:': 'fugazzi handler', 'payload': data.payload })
}

handlers.notFound = function (data, callback) {
    callback(404, { 'name': 'not found handler', 'payload': data.payload });
};

var router = {
    'sample': handlers.sample,
    'fugazzi': handlers.fugazzi
}

module.exports = server;