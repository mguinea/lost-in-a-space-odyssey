/* Tuple structure */
// 0: timer between phrases
// 1: index phrase
// 2: array of text

var dialogs = [
	[
		0.25,
		0,
		["HELLO COMMANDER", "I AM HAL THE IA OF THIS SHIP", "I WILL HELP YOU", ""]
	]
];

/* Current dialog */
var dialog = -1;

function callDialog(index){
	dialog = index;
}

function updateDialog(){
	if(dialog >= 0){
		var oldIndex 	= dialogs[dialog][1];
		var indexPhrase = (~~(t * dialogs[dialog][0]) % dialogs[dialog][2].length);

		dialogs[dialog][1] = indexPhrase;

		if(indexPhrase >= dialogs[dialog][2].length-1){
			dialog = -1;
		}

		if(oldIndex != indexPhrase && dialog != -1){
			play(Adialog);
		}
	}
}
