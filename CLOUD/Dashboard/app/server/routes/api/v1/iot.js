const express = require('express');
const router = express.Router();

const IotController = require('server/controllers/IotController');
const SocketController = require('server/controllers/SocketController');



// router.get('/entity/history/:entityId/:attrName', IotController.getEntityHistory );
// router.post('/entity/:entityId/delete', IotController.deleteEntity );
router.get('/agent/initialize', IotController.createFiwareSuscriptions);

router.post('/fiware/callback', SocketController.sendUpdate);
router.post('/historical', IotController.getHistorical);
router.post('/historical/callback', SocketController.sendHistorical);
router.post('/current/', IotController.getCurrent);
router.get('/subscriptions/', IotController.getSubscriptions);

module.exports = router;
