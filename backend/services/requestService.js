var db = require('../repositories/mysql-provider');

exports.getTotalRequest = function () {
  var sql = `select count(*) as total from REQUESTS`
  return db.load(sql)
}

exports.getRequestPerPage = function (limit, offset) {
  var sql = `select req.*, sts.Name as StatusName from REQUESTS req join STATUS sts on req.Status = sts.ID
              order by req.created_at desc limit ${limit} offset ${offset}`
  return db.load(sql)
}

exports.getRequestByID = function (id) {
  var sql = `select req.*, sts.Name as StatusName from REQUESTS req join STATUS sts on req.Status = sts.ID
            where req.ID = ${id}`
  return db.load(sql)
}
