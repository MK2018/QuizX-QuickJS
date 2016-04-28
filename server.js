var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 80);

console.log("server listening on port " + server.address().port + "...");

app.use(express.static(__dirname + '/static')); 


io.on('connection', function (socket) {

	socket.emit('init', { id: servUtils.genId() });

	socket.on('init_recieved', function (data) {
    	servUtils.addId(socket, data.id)
	});

	socket.on('disconnect', function () {
    	servUtils.removeId(socket);
	});

});

var servUtils = new function(){
	
	var conn_list = {};

	var ids = [];

	this.addId = function(socket, id){
		ids.push(id);
		conn_list[socket] = id;
		console.log("There are " + ids.length + " clients connected.");
	}

	this.removeId = function(socket){
		var t_id = conn_list[socket];
		var t_in = ids.indexOf(t_id);
		ids.splice(t_in, 1);
		delete conn_list[socket];
		console.log("There are " + ids.length + " clients connected.");
	}

	this.genId = function(){
		var guid = function(){
		  var s4 = function() {
		    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}
		var t_id = guid();
		while(ids.indexOf(t_id) > -1){
			t_id = guid();
		}
		return t_id;
	}

};