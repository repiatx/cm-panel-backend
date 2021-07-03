const http = require('http')
const debug = require('debug')('template:server')

const expressHelpers = {

  normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
      return val
    }

    if (port >= 0) {
      return port
    }

    return false
  },

  onError(error, port) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  },

  onListening(server) {
    const addr = server.address()
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
    console.log('Listening on ' + bind)
    debug('Listening on ' + bind)
  },

  handleError: (err, req, res, next) => {

    if (err.status) {

      const {status, message} = err

      return res.status(status).json({
        message: message
      })

    }

    console.log('else err')
    console.log(err)
    console.log(err.stack)

    return res.status(500).json({
      message: err.toString()
    })

  },

  start: (app) => {

    const port = expressHelpers.normalizePort(process.env.PORT || '9000')
    app.set('port', port)

    const server = http.createServer(app)

    server.listen(port)
    server.on('error', (error) => expressHelpers.onError(error, port))
    server.on('listening', () => expressHelpers.onListening(server))
  },

}

module.exports = expressHelpers

