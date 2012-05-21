# Seaport mdns

[Seaport](https://github.com/substack/seaport) with [mdns](https://github.com/agnat/node_mdns) support

[![build status](https://secure.travis-ci.org/tellnes/seaport-mdns.png)](http://travis-ci.org/tellnes/seaport-mdns)

# Quickstart

    seaport-mdns listen -p 5000

```js

var seaport = require('seaport-mdns')

seaport.find(function(ports) {
  ports.query(function(ps) {
    console.log(ps)
  })
})

```

# Methods

The lib has the same api as a seaport with the following additions.

## seaport.find(options = {}, cb)

Creates a browser and call the callback with the first seaport server it finds. If `options.name` is set, will it only callback when it finds a seaport server that matches the specified name.

## seaport.createBrowser(options = {})

Creates an instance of `seaport.Browser`

## Class: seaport.Browser

### Event: 'up'

- mdns info object

Emitted when a seaport server goes online

### Event: 'down'

- mdns info object

Emitted when a seaport servers goes offline

### browser.start()

Start browsing

### borwser.stop()

Stop browsing


## seaport.createServer(options = {}).listen()

Calls the `listen` method on the seaport server and creates and mdns advertisement.


# Install

To get the seaport mdns library, with npm do:

    npm install seaport-mdns

To get the seaport-mdns command, do:

    npm install -g seaport-mdns


## License

MIT
