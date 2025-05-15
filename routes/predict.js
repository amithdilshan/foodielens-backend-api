
const express = require('express');
const { predict } = require('../controllers/predictController');

const router = express.Router();

router.post('/', predict);

module.exports = router;
