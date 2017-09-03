/* Tuple structure */
// 0: timer between phrases
// 1: index phrase
// 2: array of text
// 3: when dialog started

var dialogs = [
	[
		1.5,
		0,
		["HELLO COMMANDER", "I AM HAL THE IA OF THIS SHIP", "I WILL HELP YOU"],
		-1
	],
	[
		0.2,
		0,
		["ENEMIES DETECTED!!!"],
		-1
	]
];

/* Current dialog */
var dialog 		= 0;
var showDialog 	= false;

function callDialog(index){
	dialog 		= index;
	showDialog 	= true;
	if(dialogs[dialog][3] == -1){
		dialogs[dialog][3] = t;
	}
}

function updateDialog(){
	if(showDialog == true){
		// Next text
		if(t > dialogs[dialog][3] + dialogs[dialog][0] * (dialogs[dialog][1] + 1)){
			++dialogs[dialog][1];
		}
		// Hide message and reset
		if(dialogs[dialog][1] > dialogs[dialog][2].length - 1){
			dialogs[dialog][3] = -1;
			showDialog = false;
		}
	}
}
