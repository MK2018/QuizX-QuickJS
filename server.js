var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 80);

app.use(express.static(__dirname + '/static')); 

io.on('connection', function (socket) {
  socket.emit('init', { id: 'temp000' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});