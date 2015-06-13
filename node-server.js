var port = process.argv[2] || 8080;
var express = require('express');
var app = express();
var codeSearch = require('./routes/code-paths.js');

var ip = '127.0.0.1';

app.get('/code', codeSearch.findAll);
app.get('/code/:major', codeSearch.findByMajor);
app.get('/code/:major/:minor', codeSearch.findByMajorMinor);
app.put('/code/:major/:minor/:description', codeSearch.addUpdateMajorMinor);
app.del('/code/:major/:minor', codeSearch.deleteMajorMinor);

app.get('/ping', function (req, res) {
      ip = req.headers['x-forwarded-for'] || req.headers['X-Real-IP'] || req.headers['X-Originating-IP'] || req.headers['X-Remote-IP']  || req.connection.remoteAddress;
      res.send({'server':ip});
});

app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname + "/static") //where your static content is located in your filesystem
);

app.listen(port); //the port you want to use
console.log("Static file server running at\n  => http://" + ip + ":" + port + "/\nCTRL + C to shutdown");