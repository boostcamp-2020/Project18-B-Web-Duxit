/**
 * Module dependencies.
 */

import debugModule from 'debug';
import http from 'http';
import socketIO from './sockets';
import createApplication from './app';

const debug = debugModule('backend:server');

/**
 * Normalize a port into a number, string, or false.
 */

const normalize = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error, port) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = (server) => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log(`Back end server Listening on port ${addr.port}`);
};

/**
 * Get port from environment and store in Express.
 */

const app = createApplication();

const normalizedPort = normalize(process.env.PORT || '3000');
app.set('port', normalizedPort);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
socketIO.attach(server, {
  cors: {
    origin: [process.env.FRONTEND_ORIGIN],
  },
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(normalizedPort);
server.on('error', (error) => onError(error, normalizedPort));
server.on('listening', () => onListening(server, normalizedPort));
