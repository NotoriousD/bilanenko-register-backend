const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { getUsers } = require('./googlesheets.controller');

router.get('/', getUsers);

module.exports = router;