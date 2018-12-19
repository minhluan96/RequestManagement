var express = require('express');
var jwt = require('jsonwebtoken');
var userService = require('../services/userService');

var router = express.Router();

router.get('/:id', (req, res, next) => {
  userService.getUserInfo(req.params.id).then(value => {
    res.statusCode = 200
    res.json(value[0])
  }).catch(err => {
    res.statusCode = 500
    next(err)
  })
})

module.exports = router;
