var seaport = require('..')
  , http = require('http')

var server = http.createServer(function (req, res) {
  res.end('beep boop\r\n');
});

seaport.find({ name: 'my-services', secret : 'beep boop' }, function(ports) {
  ports.service('web@1.2.3', function (port, ready) {
    server.listen(port, ready);
  });
})
