var md5 = require('crypto-js/md5');
var db = require('../repositories/mysql-provider');

exports.login = function (userEntity) {
  var md5_pw = md5(userEntity.Password);
  var sql = `select * from USERS where Username = '${userEntity.Username}' and Password = '${md5_pw}'`;
  return db.load(sql);
}

exports.addAccount = function(userEntity) {
  var md5_pw = md5(userEntity.Password);
  var refreshToken = md5(Date.now());
  var role = 3;
  var sql = `insert into USERS(Username, Password, RefreshToken, ID_Roles) values('${userEntity.Username}', '${md5_pw}', '${refreshToken}', ${role})`
  return db.write(sql);
}

exports.checkUserExists = function (userEntity) {
  var id = 3;
  var sql = `select u.ID, u.Username, u.ID_Roles from USERS as u  where u.ID_Roles = ${id} and u.Username = '${userEntity.Username}' `
  return db.load(sql)
}

exports.getUserInfo = function (id) {
  var sql = `select u.ID, u.Username, u.ID_Roles, r.Name from USERS u join ROLES r on u.ID_Roles = r.ID where u.id = ${id}`
  return db.load(sql)
}
