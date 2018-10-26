var canvas = document.getElementById("canvasObject");
var g = canvas.getContext("2d");

var declarations = [
["screenText",
	""
],
["setProperty",
	function(property, setTo){
		for each(prop : declarations){
			if(prop[0] === property){
				prop[1] = setTo
			}
		}
	}
],
["call"
	function(property){
		for each(prop : declarations){
			if(prop[0] === property){
				prop[1]();
			}
		}
	}
],
["clearScreen",
	
]


];
