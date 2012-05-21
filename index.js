var seaport = require('seaport')
  , mdns = require('mdns')
  , EventEmitter = require('events').EventEmitter
  , util = require('util')


function Browser(options) {
  mdns.Browser.call(this, mdns.tcp('seaport'), options)

  var self = this
  this.on('serviceUp', function(info) {
    info.connect = function() {
      return seaport.connect(info.port, info.host)
    }
    self.emit('up', info)
  })
  this.on('serviceDown', function(info) {
    self.emit('down', info)
  })
}

util.inherits(Browser, mdns.Browser)

exports.createBrowser = function(opts) {
  return new Browser(opts)
}

exports.connect = seaport.connect

exports.find = function(opts, cb) {
  if (arguments.length === 1) {
    cb = opts
    opts = {}
  }

  var name = opts.name || ''

  var browser = new Browser()
  browser.on('up', function(info) {
    if (name && info.name != name) return

    cb(info.connect())
    browser.stop()
  })
  browser.start()
}

exports.createServer = function(options) {
  options = options || {}
  var server = seaport.createServer.call(seaport, arguments)

  var origListen = server.listen
  server.listen = function(port) {
    origListen.apply(server, arguments)

    var ad = mdns.createAdvertisement(mdns.tcp('seaport'), port, {
      name: options.name
    })
  }

  return server
}
