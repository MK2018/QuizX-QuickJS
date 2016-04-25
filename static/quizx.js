function log(toAdd){
	document.getElementById("logging").innerHTML += toAdd;
}
var socket = io.connect();
socket.on('init', function (data) {
	//log(data);
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});