var express = require('express');
var app = express();
var moment = require('moment');

app.route('/:datestamp')
  .get(function(req, res, next) {
    var date = moment(req.params.datestamp, [ "X", "MMMM DD, YYYY" ], true);
    res.status(200);
    if (date.isValid()) {
      res.send( { "unix": date.format("X"), "natural": date.format("MMMM DD, YYYY") } );
    } else {
      res.send( { "unix": null, "natural": null } );
    }
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

