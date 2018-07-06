var express = require('express');
var app = express();
var formidable = require('formidable');
var bodyParser = require('body-parser');
var fs = require('fs');

var { albumList, pictureList } = require('./module/index.js');

app.use(express.static('views'));
app.set('view engine', 'ejs');            //使用ejs'模板引擎
app.use(bodyParser.json());               // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res, next){
  albumList(function(result){
    res.render('index', {
      list : result
    })
  });
});

// 相册详情
app.get('/albums/:name', function(req, res, next){
  var name = req.params.name;
  pictureList(name, function(result){
    res.render('detail', {
      name: name,
      list : result
    })
  });
});

// 上传图片
app.post('/upload', function(req, res, next){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = "./views/albums";
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    fs.rename(files.picture.path, "./views/albums/"+ fields.dir + "/" +files.picture.name);
    res.redirect('/albums/' + fields.dir);
  });

  return;
});

// 添加相册
app.post('/add_from', function(req, res, next){
  // console.log(req.body);
  if(req.body.name){
    fs.mkdir(__dirname + '/views/albums/' + req.body.name, function(err, data){});
    res.redirect('/');
  }else{
    res.json({code: 20002, message: '相册名不能为空'});
  }
  return;
});

app.listen(8080);

console.log('Server started at 8080');
