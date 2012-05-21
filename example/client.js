var seaport = require('..')
  , request = require('request')

seaport.find({ name: 'my-services', secret : 'beep boop' }, function(ports) {
  ports.get('web@1.2.x', function (ps) {
    var u = 'http://' + ps[0].host + ':' + ps[0].port
    request(u).pipe(process.stdout)
    ports.close()
  })
})
