const express = require('express');
const router = express.Router();

//

const middlewares = require('server/middlewares');

const v1 = require('server/routes/api/v1');
router.use('/v1', v1);

router.use(middlewares.notFound);

module.exports = router;
