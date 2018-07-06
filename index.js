var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var { registe, signin } = require('./module/db.js');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));

// session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

app.get('/registe.html',function(req, res, next){
  res.sendFile(__dirname + '/public/registe.html');
});

app.get(/^\/.*\.html$/,function(req, res, next){
  if(req.session.isSingnin){  // 登录了
    next();
  }else{
    res.sendFile(__dirname + '/public/signin.html');
  }
});
app.use(express.static('./public'));          // 静态资源

// 路由配置
// 注册
app.post('/registe', function(req, res){
  registe(req.body, function(result){
    res.json(result);
  });
});

// 登录
app.post('/signin', function(req, res){
  // console.log(req.body);
  signin(req.body, req, function(result){
    res.json(result);
  });
});

app.listen(8080,'127.0.0.1');
console.log('Server started at 8080');
