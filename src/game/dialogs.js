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
		2,
		0,
		["ENEMIES DETECTED!!!", "SHIELDS LOW PASSENGERS IN THIS SECTOR X HAL ASSIGNED TO TURRET X MOUSE IS NOW OPERATIVE VELOCITY INCREASED EVACUATE THE SHIP!"],
		-1
	],
	[
		2,
		0,
		["% PASSENGERS LEFT", "IN THIS SECTOR"],
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

		play(Adialog);
	}
}

function updateDialog(){
	if(showDialog == true){
		// Next text
		if(t > dialogs[dialog][3] + dialogs[dialog][0] * (dialogs[dialog][1] + 1)){
			++dialogs[dialog][1];
			if(dialogs[dialog][1] <= dialogs[dialog][2].length - 1){
				play(Adialog);
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
