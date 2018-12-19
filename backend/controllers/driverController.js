var express = require('express');
var driverService = require('../services/driverService');
var broadcastAll = require('../webSocket').broadcastAll;
var moment = require('moment')

var router = express.Router();

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  driverService.getDriverInfo(id).then(rows => {
    res.statusCode = 200
    res.json(rows[0])
  }).catch(err => {
    next(err)
  })
})

router.post('/', (req, res, next) => {
  var id = req.body.ID
  driverService.getDriverInfo(id).then(value => {
    res.statusCode = 200
    if (value.length > 0) {
      res.json(value[0])
      broadcastAll(req.body)
    } else {
      res.json({})
    }
  })
})

module.exports = router;
