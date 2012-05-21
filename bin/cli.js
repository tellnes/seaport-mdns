#!/usr/bin/env node

var seaport = require('..')

var argv = require('optimist')
  .usage( [ 'Usage: seaport-mdns <command> <arguments>'
          , ''
          , 'Commands'
          , ' listen'
          , ' browse'
          ].join('\n'))
  .describe('p', 'Port')
  .alias('p', 'port')

  .describe('h', 'Hostname')
  .alias('h', 'host')

  .describe('s', 'Seaport secret')
  .alias('s', 'secret')

  .describe('n', 'Seaport server name')
  .alias('n', 'name')

  .demand(1)

  .argv


var cmd = argv._[0]

if (cmd === 'listen') {
  if (!argv.port) return console.error('Missing port')
  seaport.createServer(argv).listen(argv.port, argv.host)

} else if (cmd == 'browse') {
  require('colors')

  var browser = seaport.createBrowser(argv)
  function message(info, status) {
    console.log(info)

  }
  browser.on('up', function(info) {
    var addressess = info.addresses.map(function(address) {
      return address.cyan
    }).join(', ')

    console.log(info.name.blue + ' is ' + 'up'.green + '    ' + info.port.toString().yellow + ', ' + addressess + ', ' + info.host.magenta + '')
  })
  browser.on('down', function(info) {
    console.log(info.name.blue + ' is ' + 'down'.red)
  })
  browser.start()
}
