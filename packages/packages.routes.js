const express = require('express');
const router = express.Router();
const { getPackages } = require('./packages.controller')

router.get('/', getPackages);

module.exports = router;