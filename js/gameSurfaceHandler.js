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
			var params = [];
			for(i in actual){
				if(i > 0){
					params.push(actual[i]);
				}
			}
			if(actual[0] in this){
				if( typeof declarations[""+actual[0]] == "function"){
					declarations[""+actual[0]].apply(this, params);
				}else{
					this.print(""+declarations[""+actual[0]]);
				}
			}else{
				this.print("Error: cannot find: \"" + actual[0] + "\"")
			}
		},
	print:
		function(){
			/* toPush is the line we are prepping to push into the screen. */
			var toPush = "";
			for(i in arguments){
				if((""+arguments[i]).includes("\\n") || (""+arguments[i]).includes("\n")){
					/* This is what triggers when there is a newline escape in the arguments we are supposed to be printing. */
					var arrayWithoutNewLine = arguments[i].split("\\n");
					console.log(arrayWithoutNewLine);
					for(k in arrayWithoutNewLine){
						if(k > 0){
							this.screen.push(toPush);
							toPush = "";
						}
						toPush+=arrayWithoutNewLine[k];
						if(k == arrayWithoutNewLine.length-1 && toPush != ""){
							/* If there is a word in toPush and we are in the last element of arrayWithoutNewLine, add a space after it. */
							toPush+=" ";
						}
						console.log(toPush + " " + k);
					}
					
					/*
					//Below is old code that I'm just leaving here for now. It kind of works, but not really. That is why I went with the above method.
					toPush+=arguments[i].replace("\\n", "");
					this.screen.push(toPush);
					toPush = "";
					*/
				}else{
					/* This is what we do when there is no no new line escape in our arguments. */
					toPush+=arguments[i];
					if(i < arguments.length){
						toPush+=" ";
					}
				}
			}
			if(toPush != ""){
				this.screen.push(toPush.trim());
			}
			
		},
	clear:
		function(){
			this.screen = [];
		},
	user: 
		"Greenman",
	setUser: 
		function(){
			this.user = arguments[0];
		},
	password: 
		"password",
	setPassword:
		function(){
			this.password  = Array.prototype.slice.call(arguments).join(" ");
			/* Fukkin bug below */
			this.print("New password: \\n" + this.password);
		},
	lock: 
		[],
	salt: 
		"salt",
	setSalt:
		function(){
			this.salt = Array.prototype.slice.call(arguments).join(" ");
		},
	login: 
		function(){
			
		},
	hash:
		/* 
			Happily stolen from "https://stackoverflow.com/questions/194846/is-there-any-kind-of-hash-code-function-in-javascript" with a few edits to make it work. 
			I know I should really be using the sha256 hash, but I figure this will do for a simple project like this. 
			I would not use this is production however. 
		*/
		function(){
			var hash = 0;
			if (arguments[0].length == 0){
				return hash;
			}
			var toHash = (arguments[1] == undefined) ? arguments[0] : arguments[0]+arguments[1];
			console.log(toHash);
			for (i = 0; i < toHash.length; i++) {
				var c = toHash.charCodeAt(i);
				hash = ((hash<<5)-hash)+c;
				hash = hash & hash; // Convert to 32bit integer
			}
			this.print("hash: " + hash);
			return hash;
		},
	generateLock: 
		function(){
			var lockToBe = this.password.split("");
			for(i in lockToBe){
				lockToBe[i] = this.hash(lockToBe[i], this.salt);
			}
			this.lock = lockToBe;
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