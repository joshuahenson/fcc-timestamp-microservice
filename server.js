var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/:input', function (req, res) {
    var param = req.params.input;
    var month = [ "January ", "February ", "March ", "April ",
                  "May ", "June ","July ", "August ", "September ",
                  "October ", "November ", "December " ];
    if (isNaN(param)) {
      var date = new Date(param);
      if (date == 'Invalid Date') {
        return res.send({"unix": null, "natural": null})
      }
    } else {
      date = new Date(param*1000);
    }
    var jsonResponse = {
      "unix": Math.floor(date.getTime() / 1000) ,//UTC
      "natural": month[date.getUTCMonth()] + date.getUTCDate() + ', ' + date.getUTCFullYear()
    }
    res.send(jsonResponse);
  });

var port = 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
