var md5 = require('crypto-js/md5');
var db = require('../repositories/mysql-provider');

exports.login = function (userEntity) {
  var md5_pw = md5(userEntity.Password);
  var sql = `select * from USERS where Username = '${userEntity.Username}' and Password = '${md5_pw}'`;
  return db.load(sql);
}
