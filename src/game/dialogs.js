/* Tuple structure */
// 0: timer between phrases
// 1: index phrase
// 2: array of text
// 3: when dialog started

var dialogs = [
	[
		1.5,
		0,
		["GREETINGS COMMANDER", "I AM THE AI OF THIS SHIP", "OUR MISSION:", "TO RESCUE ALL PASSENGERS.", "SOME INSTRUCTIONS:", "GREEN ARROWS POINT TO PASSENGERS", "RED ARROWS TO ENEMIES", "AND BLUE ARROWS TO JUMP POINTS", "GOOD LUCK!"],
		-1
	],
	[
		2,
		0,
		["ENEMIES DETECTED!!!"],
		-1
	],
	[
		2,
		0,
		["THERE ARE PASSENGERS LEFT", "IN THIS SECTOR"],
		-1
	],
	[
		3,
		0,
		["WE HAVE TO RESCUE ALL PASSENGERS","BEFORE LEAVING THIS SECTOR!!!"],
		-1
	],
	[
		3,
		0,
		["PRESS H KEY FOR HYPERSPACE JUMP"],
		-1
	],
	[
		3,
		0,
		["NO MORE PASSENGERS IN THIS SECTOR","GO TO ANY BLUE JUMP POINT"],
		-1
	]
];

/* Current dialog */
var dialog 		= 0;
var showDialog 	= false;

function callDialog(index, params){
	dialog 		= index;
	showDialog 	= true;
	if(dialogs[dialog][3] == -1){
		dialogs[dialog][3] = t;

		//*
        if(params !== undefined){
            for(var i = 0; i < dialogs[dialog][2].length; ++i){
				if(params[i] !== undefined){
                	dialogs[dialog][2][i]  = dialogs[dialog][2][i].replace("%", params[i]);
				}
            }
        }
        //*/

		// play(Adialog);
	}
}

function updateDialog(){
	if(showDialog == true){
		// Next text
		if(t > dialogs[dialog][3] + dialogs[dialog][0] * (dialogs[dialog][1] + 1)){
			++dialogs[dialog][1];
			if(dialogs[dialog][1] <= dialogs[dialog][2].length - 1){
				// play(Adialog);
			}
		}
		// Hide message and reset
		if(dialogs[dialog][1] > dialogs[dialog][2].length - 1){
			dialogs[dialog][1] 	= 0;
			dialogs[dialog][3] 	= -1;
			showDialog 			= false;
		}
	}
}
