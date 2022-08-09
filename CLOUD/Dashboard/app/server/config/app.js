const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');

const SocketController = require('server/controllers/SocketController');

require('dotenv').config();

const app = express();
const https = require('https');
const key = fs.readFileSync('certificates/key.pem','utf8');
const cert = fs.readFileSync('certificates/cert.cert','utf8');

const servera = https.createServer({key: key, cert: cert }, app);
var server = require('http').Server(app);
var io = require('socket.io')(server,{
  allowEIO3: true,
  cors: {
    origin: '*'
  }
});

io.on('connection',SocketController.clientConnected);

app.use(function(req, res, next) {
  req.io = io;
  next();
});

app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json({limit: '25mb'}));

//

const routes = require('server/routes');
app.use(routes);
const port = process.env.PORT || 5000;

servera.listen(5001, () => {
  /* eslint-disable no-console */
  console.log(`Listening: https://localhost:5001`);
  /* eslint-enable no-console */
});
module.exports = server;