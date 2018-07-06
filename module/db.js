let { MongoClient } = require('mongodb');
// 数据库URL
var url = 'mongodb://localhost:27017/node';
let { crypto } = require('./crypto.js');

//注册
exports.registe = function(data, callback){
  MongoClient.connect(url, function(err, db) {
    if(err)return;
    // console.log("数据库连接成功");
    var collection = db.collection('user');
    data.password = crypto(data.password);
    //先查询该名称有没有被注册过
    collection.find({name: data.name}).toArray(function(err, result){
      if(err){
        callback({code: 20002, message: 'error'});
        db.close();
        return;
      }
      // console.log(result);
      if(result.length != 0){
        callback({code: 20003, message: '该名称已被注册'});
        db.close();
        return;
      }
      collection.insertOne(data, function(err, result){
        if(err){
          callback({code: 20002, message: 'error'});
          db.close();
          return;
        }
        callback({code: 20001, message: 'success'});
        db.close();
      });
    });

  });
}


//登录
exports.signin = function(data, req, callback){
  MongoClient.connect(url, function(err, db) {
    if(err)return;
    var collection = db.collection('user');
    //先查询该用户名是否存在
    collection.find({name: data.name}).toArray(function(err, result){
      if(err){
        callback({code: 20002, message: '登录错误'});
        db.close();
        return;
      }
      // 没有查到该用户
      if(result.length == 0){
        callback({code: 20003, message: '请先注册'});
        db.close();
        return;
      }
      var password = result[0].password;    //数据库中存的密码
      // 将登录密码加密跟数据中的对比
      console.log('数据库密码：' + password);
      console.log('登录密码：' + crypto(data.password));
      if(crypto(data.password) === password){
        req.session.isSingnin  = true;      //设置session
        callback({code: 20001, message: '登录成功'});
      }else{
        callback({code: 20002, message: '用户名或密码错误，登录失败'});
      }
      db.close();
    });

  });
}
