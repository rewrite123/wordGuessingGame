document.body.style.backgroundColor = "black";

var canvas = document.getElementById("canvasObject");
var g = canvas.getContext("2d");

var declarations = {
	render: 
		/* Renders the screen. Not much else is done. */
		function(){
			if(canvas.width != window.innerWidth-20 || canvas.height != window.innerHeight-20){
				canvas.width  = window.innerWidth-20;
				canvas.height = window.innerHeight-20;
			}
			g.fillStyle = this.backgroundColor;
			g.fillRect(0,0,canvas.width, canvas.height);
			for(i in this.screen){
				g.font="16px Arial";
				g.fillStyle = this.screenColor;
				g.fillText("GT>> " + this.screen[i], 10, 20 + 15*i);
			}
		},
	renderLoop: 
		setInterval(
			function(){
				declarations.render();
			},
			31
		),
	screenColor:
		"rgb(0, 255, 0)"
		,
	setScreenColor:
		function(){
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
				this.screenColor = args.join(" ");
			}else{
				this.print("You need to provide an arg for that to work!");
			}
		},
	backgroundColor:
		"rgb(0, 0, 0)"
		,
	setBackgroundColor:
		function(){
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
				this.backgroundColor = args.join(" ");
			}else{
				this.print("You need to provide an arg for that to work!");
			}
		},
	screen: 
		/* Self explanitory. */
		[
			"Welcome to greenman's \"\"\"*terminal\"\"\"!", 
			"This is just a simple terminal like enviroment where you can play a simple password guessing game.",
			"To set the password, type \"setPassword\" followed by the new password.",
			"To set the salt for the password hash, type \"setSalt\" followed by the salt. ",
			"Lastly, to generate the lock that you will be trying to guess, type \"generateLock\" and then you can start guessing passwords.",
			"To see if a character is contained in the lock, type \"guessLockChar\" followed by the character you are guessing.",
			"To guess the password, type \"login\" followed by your attempted password.",
			"To make things easier for you, I also added the functionality to see what the actual password is by typing \"password\".",
			"To make a new random password, type \"generateRadomPassword\", and a new password will be generated. Just remember to generate the lock afterwards.",
			"You don't really need to worry about setting the salt, since it's just there to make hash tables unusable should you attempt to \"break\" this rather simple hash.",
			"To see how many guesses you have, type \"guesses\".",
			"To clear the screen, type \"clear\"",
			""
		],
	call: 
		/* This just takes our first word from our input and tries to call a function or property from it. */
		function(){
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
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
			}else{
				this.print("You need to provide an arg for that to work!");
			}
		},
	print:
		/* F*ck this function. Used to print to the screen. Gud luck understanding it on your first go. */
		function(){
			/* toPush is the line we are prepping to push into the screen. */
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
				var toPush = "";
				for(i in args){
					if((""+args[i]).includes("\\n") || (""+args[i]).includes("\n")){
						/* This is what triggers when there is a newline escape in the args we are supposed to be printing. */
						var arrayWithoutNewLine = args[i].split("\\n");
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
						toPush+=args[i].replace("\\n", "");
						this.screen.push(toPush);
						toPush = "";
						*/
					}else{
						/* This is what we do when there is no no new line escape in our args. */
						toPush+=args[i];
						if(i < args.length){
							toPush+=" ";
						}
					}
				}
				if(toPush != ""){
					this.screen.push(toPush.trim());
				}
			}else{
				this.print("You need to provide an arg to call this!");
			}
		},
	clear:
		/* Clears the screen of all text. */
		function(){
			this.screen = [""];
		},
	user: 
		"Greenman",
	setUser: 
		/* Sets the user. */
		function(){
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
				this.user = args[0];
				if(this.user.toLowerCase() == "e" || this.user.toLowerCase() == "eric" || this.user.toLowerCase() == "erik" || this.user.toLowerCase() == "tony" || this.user.toLowerCase() == "baggio"){
					/* From one of the best shows ever. It's still running BTW. It started in like 2001 so you know its good. RIP MONTY. */
					this.clear();
					var line = 0;
					var lines = [
						"Simmons: Hey.",
						"Grif: Mmyeah?",
						"Simmons: D'you ever wonder why we're here?",
						"Grif: It's one of life's great mysteries, isn't it? Why are we here? I mean, are we the product of some... cosmic coincidence? Or is there really a God, watching everything, you know, with a plan for us and stuff. I don't know man, but it keeps me up at night.",
						"Simmons: ...What? I mean why are we out here, in this canyon?",
						"Grif: Oh. Uhhhhh. Yeah.",
						"Simmons: And what was all that stuff about God?",
						"Grif: Uhhhhh. Hm? Nothing.",
						"Simmons: ...Do you want to talk about it?",
						"Grif: No.",
						"Simmons: You sure?",
						"Grif: Yes.",
						"Simmons: Seriously though, why are we out here? As far as I can tell, it's just a box canyon in the middle of nowhere. No way in or out.",
						"Grif: Mmhm.",
						"Simmons: The only reason that we set up a red base here is because they have a blue base over there. And the only reason they have a blue base over there is because we have a red base here.",
						"Grif: Well, yeah, that's because we're fighting each other.",
						"Simmons: No, no, but I mean... even if we were to pull out today, and they were to come and take our base, they would have two bases in the middle of a box canyon. Whoopdee-fuckin-doo.",
						"Grif: What's up with that anyway? I mean, I signed on to fight some aliens, next thing I know, Master Chief blows up the whole Covenant Armada, and I'm stuck in the middle of nowhere fighting a bunch of blue guys!",
						"-RED VS BLUE, S1, E1",
						""
					];
					var show = setInterval(function(){
						if(line < lines.length){
							declarations.screen.push(lines[line]);
							line++;
						}else{
							clearInterval(show);
						}
					}, 4000);
				}
			}else{
				this.print("You need to provide an arg to call this!");
			}
		},
	guesses:
		10,
	password: 
		"password",
	setPassword:
		/* Just sets the password to whatever you want it to be. */
		function(){
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
				this.password  = Array.prototype.slice.call(arguments).join(" ");
				this.print("New password: \\n" + this.password);
			}else{
				this.print("You need to provide an arg for that to work!");
			}
		},
	generateRandomPassword:
		function(){
			/* Happily stolen from: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript#8084248 */
			var newPass = (Math.random() + 1).toString(36).substring(7);
			this.password = newPass;
		},
	lock: 
		[],
	salt: 
		"salt",
	setSalt:
		/* Just sets the salt to what you want it to be */
		function(){
			this.salt = Array.prototype.slice.call(arguments).join(" ");
		},
	login: 
		/* Hashes your guess, and then checks it against the lock. If they are equal (excluding collisions), then you got the answer. */
		function(){
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
				var attempt = args.join(" ");
				if(this.hash(attempt, this.salt) == this.lock[0]){
					this.print("Password accepted!", "\nWelcome ", this.user + "!");
					this.guesses = 10;
				}else{
					this.guesses--;
					if(this.guesses <= 0){
						setInterval(function(){declarations.screen = ["FAILED TO AUTHENTICATE!", " SHUTTING DOWN!"];}, 31);
						setTimeout(function(){window.location.reload();}, 3000);
					}
				}
			}else{
				this.print("You need to provide an arg for that to work!");
			}
		},
	guessLockChar: 
		/* Checks your character against the other characters in lock after hashing it with salt. */
		function(){
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
				charsAt = [];
				for(r = 1; r < this.lock.length; r++){
					if(this.hash(args[0], this.salt) == this.lock[r]){
						charsAt.push(r-1);
					}
				}
				if(charsAt.join() == ""){
					this.guesses--;
					if(this.guesses <= 0){
						setInterval(function(){declarations.screen = ["FAILED TO AUTHENTICATE!", " SHUTTING DOWN!"];}, 31);
						setTimeout(function(){window.location.reload();}, 3000);
					}
				}
				this.print("Char " + args[0] + " was found in these positions: " + charsAt);
			}else{
				this.print("You need to provide an arg to call this!");
			}
		},
	hash:
		/* 
			Happily stolen from "https://stackoverflow.com/questions/194846/is-there-any-kind-of-hash-code-function-in-javascript" with a few edits to make it work. 
			I know I should really be using the sha256 hash, but I figure this will do for a simple project like this. 
			I would not use this is production however. 
		*/
		function(){
			var args = Array.prototype.slice.call(arguments);
			if(args.length > 0){
				var hash = 0;
				if (args[0].length == 0){
					return hash;
				}
				var toHash = (args[1] == undefined) ? args[0] : args[0]+args[1];
				for (i = 0; i < toHash.length; i++) {
					var c = toHash.charCodeAt(i);
					hash = ((hash<<5)-hash)+c;
					hash = hash & hash; // Convert to 32bit integer
				}
				//this.print("hash: " + hash);
				return hash;
			}else{
				this.print("You need to provide an arg for that to work!");
			}
		},
	generateLock: 
		/* Generates a hash for each letter and one for the password and puts it into lock. */
		function(){
			var lockToBe = this.password.split("");
			lockToBe.unshift(this.password);
			for(i in lockToBe){
				lockToBe[i] = this.hash(lockToBe[i], this.salt);
			}
			this.lock = lockToBe;
		},
	vim:
		/* Neatly traps you. */
		function(){
			setInterval(function(){
				var r = Math.floor(255*Math.sin((new Date).getTime()/255)/2+255/2);
				console.log(r);
				declarations.screenColor = "rgb(" + r + ", 10, 10)";
				declarations.screen = [
					"You seem to be trapped with no escape!",
					"If only you knew the magic incantation you could leave."
				];
			}, 31);
		}
};

var getLine = declarations.screen.length-1;

document.addEventListener("keydown", function(e){
	if(e.keyCode == 8){
		//Backspace
		//If for some reason we fucked up, this just goes to undefined
		if(declarations.screen[declarations.screen.length-1] == undefined){
			declarations.screen[declarations.screen.length-1] = "undefined";
		}
		declarations.screen[declarations.screen.length-1] = (declarations.screen[declarations.screen.length-1].length > 0) ? declarations.screen[declarations.screen.length-1].substring(0,declarations.screen[declarations.screen.length-1].length-1) : declarations.screen[declarations.screen.length-1];
	}else if(e.keyCode == 13){
		declarations.call(declarations.screen[declarations.screen.length-1]);
		declarations.screen.push("");
	}else if(e.keyCode == 16 || e.keyCode == 17 || e.keyCode == 18 || e.keyCode == 20 || e.keyCode == 91){
		
	}else if(e.keyCode == 37){
		//left arrow
	}else if(e.keyCode == 38){
		//up arrow
		getLine--;
		if(getLine < 0){
			getLine = declarations.screen.length-1;
		}
		declarations.screen[declarations.screen.length-1] = declarations.screen[getLine];
	}else if(e.keyCode == 39){
		//right arrow
	}else if(e.keyCode == 40){
		//down arrow
		getLine++;
		if(getLine > declarations.screen.length-1){
			getLine = 0;
		}
		declarations.screen[declarations.screen.length-1] = declarations.screen[getLine];
	}else if(e.key.length > 1){
		/* This just does nothing with the keys that we don't want to handle. */
	}else{
		declarations.screen[declarations.screen.length-1]+=e.key;
	}
});