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
        buffer += decoder.write('h');
    });

    req.on('end', function () {
        buffer += decoder.end();

        res.end(`Hello, World!\n${trimmedPath}`);

        console.log(`Request received on path: ${trimmedPath} with method: ${method} and with these query string objects `, queryStringObject);
        console.log(`Request received with these headers: \n `, headers);
        console.log(`Request received with this payload: `, buffer);
    });
});

server.listen(port, function () {
    console.log(`The server is listening on ${port} now`);
});

module.exports = server;