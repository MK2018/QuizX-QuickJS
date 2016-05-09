var quizx = new function(){
	
	var socket = io.connect();

	socket.on('init', function (data) {
		gameData.id = data.id;
		socket.emit('init_recieved', { id: gameData.id });
		//testStuff.test1();
	});

	socket.on('room_joined', function(data){
		console.log(data);
	});

	var testStuff = new function(){
		
		this.test1 = function(){
			console.log(gameData.clientId());
		}

	};

	var gameData = new function(){

		this.id = -1;

		this.room = -1;

		this.clientId = function(){
			return this.id;
		}

	};

	document.getElementById("connect_room_button").addEventListener("click", function(){
	    socket.emit('join_room', 'something');
	});
};