var enemy = [
    0,      // 0: x
    0,      // 1: y
    64,     // 2: radius
    45,     // 3: angle
    0,      // 4: force X
    0,      // 5: force Y
    0,      // 6: Control index for HAL
    100,    // 7: Acceleration
    0,      // 8: turret position up, down, left, right, 4 = direction
    10,     // 9: shooter delay
    0,      // 10: value of current shooter delay
    0.2,    // 11: shooter cadence
];

function updateEnemy(e, j){
    // Move near player

    // If collides with player bullet, destroy
    for( var i = playerBullets.length - 1 ; i >= 0; --i){
        if(distanceTo(e, playerBullets[i]) <= 0){
            playerBullets.splice(i--, 1);
            enemies.splice(j--, 1);
        }
    }
}

function drawEnemy(e){
    ctx.fillStyle	= "#e74c3c";
    ctx.beginPath();
    ctx.arc( e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true );
    ctx.fill();
}
