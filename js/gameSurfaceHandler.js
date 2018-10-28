document.body.style.backgroundColor = "black";

var canvas = document.getElementById("canvasObject");
var g = canvas.getContext("2d");

var declarations = {
	render: 
		function(){
			if(canvas.width != window.innerWidth-20 || canvas.height != window.innerHeight-20){
				canvas.width  = window.innerWidth-20;
				canvas.height = window.innerHeight-20;
			}
			g.fillStyle = "rgb(0, 0, 0)";
			g.fillRect(0,0,canvas.width, canvas.height);
			for(i in this.screen){
				g.font="16px Arial";
				g.fillStyle = "rgb(0, 255, 0)";
				g.fillText("GT>> " + this.screen[i], 10, 20 + 15*i);
			}
		},
	renderLoop: setInterval(
		function(){
			declarations.render();
		},
		31
	),
	screen: 
		[
			"Welcome to greenman's terminal!", 
			"Please enter the password for this instance of GT: ",
			"To attempt a login, type \"login\" followed by the password for this user.",
			""
		],
	call: 
		function(){
			var actual = arguments[0].split(" ");
			var params = "";
			for(i in actual){
				if(i > 0){
					params+= " "+actual[i];
				}
			}
			if(actual[0] in this){
				declarations[""+actual[0]](params);
			}else{
				this.print("That function does not exist!")
			}
		},
	print:
		function(){
			this.screen.push(arguments[0]);
		},
	clear:
		function(){
			this.screen = [];
		},
	user: 
		"Greenman",
	getUser: 
		function(){
			this.print(this.user);
		},
	setUser: 
		function(){
			this.user = arguments[0];
		},
	password: 
		"password",
	salt: 
		"salt",
	login: 
		function(){
			
		},
	hash:
		function(){
			var hash = 0;
			if (this.password.length == 0){
				return hash;
			}
			var toHash = this.password+this.salt;
			for (i = 0; i < toHash.length; i++) {
				char = toHash.charCodeAt(i);
				hash = ((hash<<5)-hash)+char;
				hash = hash & hash; // Convert to 32bit integer
			}
			print(hash);
			return hash;
		}
};

document.addEventListener("keydown", function(e){
	if(e.keyCode == 8){
		declarations.screen[declarations.screen.length-1] = (declarations.screen[declarations.screen.length-1].length > 0) ? declarations.screen[declarations.screen.length-1].substring(0,declarations.screen[declarations.screen.length-1].length-1) : declarations.screen[declarations.screen.length-1];
	}else if(e.keyCode == 13){
		declarations.call(declarations.screen[declarations.screen.length-1]);
		declarations.screen.push("");
	}else if(e.keyCode == 16 || e.keyCode == 17 || e.keyCode == 18 || e.keyCode == 20 || e.keyCode == 91){
		
	}else{
		declarations.screen[declarations.screen.length-1]+=e.key;
	}
});