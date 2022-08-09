const express = require('express');
const router = express.Router();

const iot = require('server/routes/api/v1/iot');
router.use('/iot', iot);

module.exports = router;
