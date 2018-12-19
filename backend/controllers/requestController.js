var express = require('express');
var requestService = require('../services/requestService');
var broadcastAll = require('../webSocket').broadcastAll;
var moment = require('moment')

var router = express.Router();

router.post('/', (req, res, next) => {
  var id = req.body.ID
  requestService.getRequestByID(id).then(value => {
    res.statusCode = 200
    if (value.length > 0) {
      res.json(value[0])
      broadcastAll(value)
    } else {
      res.json({})
    }
  })
})

router.get('/', (req, res, next) => {
  var page = req.query.page || 1;
  var perPage = req.query.per_page || 10;
  var offset = (page - 1) * perPage;

  var totalItems = 0
  var totalPages = 0

  var ts = 0
  if (req.query.ts) {
    ts = +req.query.ts
  }
  var loop = 0
  var execute = () => {
    requestService.getTotalRequest().then(rows => {
      totalItems = rows[0].total
      totalPages = Math.ceil(totalItems / perPage)
      return requestService.getRequestPerPage(perPage, offset)
    }).then(rows => {
      if (rows.length > 0) {
        res.json({
              results: rows,
              perPage: rows.length,
              return_ts: moment().unix(),
              totalPages: totalPages
            })
      } else {
        loop++
        if (loop < 5) {
          setTimeout(execute, 3500)
        } else {
          res.statusCode = 204
          res.end('No updated data')
        }
      }

    }).catch(error => {
        next(error);
    })
  }
  execute()
})

router.get('/refresh', (req, res, next) => {
  var ts = 0
  if (req.query.ts) {
    console.log(req.query.ts)
    ts = +req.query.ts
  }

  var loop = 0
  var execute = () => {
    requestService.getRequestsUpdate(ts).then(rows => {
      if (rows.length > 0) {
        console.log('refresh sent')
        res.json({
          results: rows,
          return_ts: moment().unix()
        })
      } else {
        loop++
        if (loop < 5) {
          setTimeout(execute, 3500)
        } else {
          res.statusCode = 204
          res.end('No updated data')
        }
      }

    }).catch(error => {
      next(error);
    })
  }
  execute()
})

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  requestService.getRequestByID(id).then(value => {
    res.statusCode = 200
    console.log(value)
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
