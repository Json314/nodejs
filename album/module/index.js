var fs = require('fs');

// 查询所有相册
var albumList = function(callback){
  fs.readdir(__dirname + '/../views/albums', function(err, data){
    if(err){
        throw err;
    }
    callback(data);
  });
}

// 查询该相册下的所有照片
var pictureList = function(name, callback){
  var arr = [];
  fs.readdir(__dirname + '/../views/albums/' + name, function(err, data){
    if(err){
        throw err;
    }
    var regexp = /^.*\.(jpg|jpeg|gif|png)$/i;
    for(var i=0;i<data.length;i++){
      if(regexp.test(data[i])){
        arr.push(data[i])
      }
    }
    callback(arr);
  });
}
// pictureList('相册1', function(a){console.log(a)});

exports.albumList = albumList;
exports.pictureList = pictureList;
