// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {  
    try{
      var dt = new Date();
      
      if (req.params.date) {
        let isnum = /^\d+$/.test(req.params.date);

        if (isnum){
          dt = new Date(parseInt(req.params.date));
        }else{
          dt = new Date(req.params.date);          
        }
      }

      if (isNaN(dt)){
        throw new Error("Date is not valid");
      }

      let unixTime = dt.getTime();
      let utcTime = dt.toGMTString();

      res.json({"unix":unixTime, "utc":utcTime});      
    }
    catch (e) {
    console.error(e, e.stack);
    res.json({ error : "Invalid Date" });
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
