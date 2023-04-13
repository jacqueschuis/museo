const express = require('express');
const router = express.Router();

const devController = require('../controllers/devController');

const catchAsync = require('../utilities/catchasync');

router.get('/', devController.devHome);

router.route('/newmuseum')
    .get(devController.newMuseumForm)
    .post(catchAsync(devController.newMuseumSubmit))

module.exports = router;