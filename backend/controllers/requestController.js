var express = require('express');
var requestService = require('../services/requestService');
var broadcastAll = require('../webSocket').broadcastAll;
var moment = require('moment')

var router = express.Router();

router.get('/', (req, res, next) => {
  var page = req.query.page || 1;
  var perPage = req.query.per_page || 10;
  var offset = (page - 1) * perPage;

  var totalItems = 0
  var totalPages = 0

  requestService.getTotalRequest().then(rows => {
    totalItems = rows[0].total
    totalPages = Math.ceil(totalItems / perPage)
    return requestService.getRequestPerPage(perPage, offset)
  }).then(rows => {
    res.json({
          results: rows,
          perPage: rows.length,
          return_ts: moment().unix(),
          totalPages: totalPages
        })
  }).catch(error => {
      next(error);
  })
})

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  requestService.getRequestByID(id).then(value => {
    res.statusCode = 200
    if (value.length > 0) {
      res.json(value[0])
    } else {
      res.json({})
    }
  }).catch(err => {
    next(err)
  })
})


module.exports = router;
