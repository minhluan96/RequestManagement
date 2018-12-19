var db = require('../repositories/mysql-provider');

exports.getDriverInfo = function (id) {
  var sql = `select ID, Username, Latitude, Longtitude, updated_at from DRIVERS where ID = ${id}`
  return db.load(sql)
}
