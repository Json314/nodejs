var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.html');
});

io.on('connection', function (socket) {
  socket.on('q', function (data) {
    io.emit('a', '收到消息');
  });
});
