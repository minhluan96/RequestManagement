var db = require('../repositories/mysql-provider');

exports.getTotalRequest = function () {
  var sql = `select count(*) as total from REQUESTS`
  return db.load(sql)
}

exports.getRequestPerPage = function (limit, offset) {
  var sql = `select req.*, sts.Name as StatusName, drv.ID as DriverID, drv.Username as DriverUsername, 
              drv.Latitude as DriverLatitude, drv.Longtitude as DriverLongtitude, drv.updated_at as DriverUpdateTime
              from (REQUESTS req join STATUS sts on req.Status = sts.ID)
              left outer join DRIVERS drv on req.Driver = drv.ID
              order by req.created_at desc limit ${limit} offset ${offset}`
  return db.load(sql)
}

exports.getRequestsUpdate = function (ts) {
    var sql = `select req.*, sts.Name as StatusName, drv.ID as DriverID, drv.Username as DriverUsername,
                drv.Latitude as DriverLatitude, drv.Longtitude as DriverLongtitude, drv.updated_at as DriverUpdateTime
                from (REQUESTS req join STATUS sts on req.Status = sts.ID)
                left outer join DRIVERS drv on req.Driver = drv.ID where req.created_at >= ${ts}`
  console.log(sql)
  return db.load(sql)
}

exports.getRequestByID = function (id) {
  var sql = `select req.*, sts.Name as StatusName, drv.ID as DriverID, drv.Username as DriverUsername,
            drv.Latitude as DriverLatitude, drv.Longtitude as DriverLongtitude, drv.updated_at as DriverUpdateTime
            from (REQUESTS req join STATUS sts on req.Status = sts.ID)
            left outer join DRIVERS drv on req.Driver = drv.ID
            where req.ID = ${id}`
  console.log(sql)
  return db.load(sql)
}
