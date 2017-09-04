/* Tuple structure */
// 0: timer spawn
// 1: active
var enemyWave = [0, 0];

function createWaveEnemy(){
	enemyWave[0] = t + random(5, 15);
	if(dialog == 0){
		enemyWave[0] = t + dialogs[dialog][2].length * dialogs[dialog][0]  + random(5, 15);
	}
    enemyWave[1] = 1;
}
