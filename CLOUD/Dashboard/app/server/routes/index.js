const express = require('express');
const path = require('path');

const router = express.Router();

//

const middlewares = require('server/middlewares');
const api = require('server/routes/api');

// NodeJS: Back-End
router.use('/api', api);

// Angular: Front-End
const angularFolder = `${path.dirname(__basedir)}/client/dist/`;
router.use(express.static(angularFolder));
router.get('/*', (req, res) => {
  // res.send('Hello Nodemon!');
  res.sendFile(path.join(angularFolder, 'index.html'));
});

// Middlewares
router.use(middlewares.notFound);
router.use(middlewares.errorHandler);

module.exports = router;
