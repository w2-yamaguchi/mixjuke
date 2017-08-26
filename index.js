var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(port, function() {
    console.log('app is running on port', port);
});
