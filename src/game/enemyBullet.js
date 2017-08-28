function updateEnemyBullet(e, i){
    // Detroy if timer ends
    if(t > e[5]){
        enemyBullets.splice(i--, 1);
    }
    // Resize after timer
    if(t > e[6]){
        e[2] = 4;
    }
    // Move
    e[0] += e[4] * Math.cos((e[3])) * dt;
    e[1] += e[4] * Math.sin((e[3])) * dt;
	// If collides with player, destroy and substract life to player
	var distanceToPlayer = distanceTo(e, player);
	if(player[12] > 0){
		if(distanceToPlayer <= 1){
			e[2] = 24;
		}
	    if(distanceToPlayer <= 0){
            // SFX
            play(Aexplosion1);
	        enemyBullets.splice(i--, 1);
	        player[12] -= 10;
	    }
	}
}

function drawEnemyBullet(e){
    ctx.save();
    //setContextAtrribute(46, 1);
	ctx.fillStyle = "#0f0";
    ctx.beginPath();
    ctx.arc(e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
}
