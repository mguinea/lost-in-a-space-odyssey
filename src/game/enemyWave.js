/* Tuple structure */
// 0: timer spawn
// 1: active
var enemyWave = [0, 0];

function createWaveEnemy(){
	enemyWave[0] = t + random(5, 10);
    enemyWave[1] = 1;
}
