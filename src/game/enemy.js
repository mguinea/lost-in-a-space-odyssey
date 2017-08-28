/* Used in game.js
var enemy = [
    0,      // 0: x
    0,      // 1: y
    64,     // 2: radius
    0,      // 3: angle
    0,      // 4: force X
    0,      // 5: force Y

    0,      // 6: shoot timer
    100,    // 7: Acceleration
];
//*/

function updateEnemy(e, j){
    e[3]                    = angleTo(e, player);
    var distanceToPlayer    = distanceTo(e, player);
    // Go where forces say
    var angle  = e[3];
    var forceX = e[4];
    var forceY = e[5];

    e[0] += forceX * dt;
    e[1] += forceY * dt;

    var maxVel = 35;
    // If too far... accelerate to ship
    if(distanceToPlayer > 100){
        if(Math.abs(forceX) <= maxVel){
            e[4] += e[7] * Math.cos(e[3]) * dt;
        }
        if(Math.abs(forceY) <= maxVel){
            e[5] += e[7] * Math.sin(e[3]) * dt;
        }
    }
    // If too near... go inverse
    else{
        if(Math.abs(forceX) <= maxVel){
            e[4] -= e[7] * Math.cos(e[3]) * dt;
        }
        if(Math.abs(forceY) <= maxVel){
            e[5] -= e[7] * Math.sin(e[3]) * dt;
        }
    }

    // Max forces correction
    if(e[4] > maxVel){
        e[4] = maxVel;
    }else if(e[4] < -maxVel){
        e[4] = -maxVel;
    }
    if(e[5] > maxVel){
        e[5] = maxVel;
    }else if(e[5] < -maxVel){
        e[5] = -maxVel;
    }

    // Shoot if timer and distance
    if(distanceToPlayer < 110 && e[6] < t){
        e[6] = t + random(1, 7); // timer  + cadence
        enemyBullets.push(
            [
                e[0],
                e[1],
                12,
                random(e[3] - (7).toRad(), e[3] + (7).toRad()),
                64,
                t + 2.5,
                t + 0.05
            ]
        ); // 0 x, 1 y, 2 radius, 3 angle, 4 vel, 5 timer end, 6 timer resize
    }

    // If collides with player bullet, destroy
    /*
    for( var i = playerBullets.length - 1 ; i >= 0; --i){
        if(distanceTo(e, playerBullets[i]) <= 0){
            playerBullets.splice(i--, 1);
            enemies.splice(j--, 1);
        }
    }//*/
}

function drawEnemy(e){
    // Draw body
    ctx.fillStyle	= "#e74c3c";
    ctx.beginPath();
    ctx.arc( e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true );
    ctx.fill();
    // Draw propeller
    var tx = e[0] + Math.cos( (e[3]) ) * e[2];
    var ty = e[1] + Math.sin( (e[3]) ) * e[2];
    ctx.fillStyle	= "#fff";
    ctx.beginPath();
    ctx.arc( tx - cam[0], ty - cam[1], 8, 0, Math.PI * 2, true );
    ctx.fill();
}

function createEnemies( number ){
    for( var i = number - 1; i >= 0; --i){
        var enemy = [
            //random(player[0] - 128, player[0] + 128),   // 0: x
            //random(player[1] - 128, player[1] + 128),   // 1: y
            player[0] + 64,
            player[1] - 12,
            24,     // 2: radius
            0,      // 3: angle
            0,      // 4: force X
            0,      // 5: force Y

            t + 5,  // 6: shooter timer
            100,    // 7: Acceleration
        ];
        enemies.push( enemy );
    }
}
