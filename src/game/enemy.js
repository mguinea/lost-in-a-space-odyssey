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

function updateEnemy(e, params, j){
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
        // SFX
        play(AeShot);

        e[6] = t + random(1, 7); // timer  + cadence
        /*
        var x = -Math.cos(turretsAngles[turretSelected].toRad()) * 18,
            y =  Math.sin(turretsAngles[turretSelected].toRad()) * 18;*/
        enemyBullets.push(
            [
                e[0] + Math.cos( (e[3]) ) * (e[2]+12),
                e[1] + Math.sin( (e[3]) ) * (e[2]+12),
                12,
                random(e[3] - (7).toRad(), e[3] + (7).toRad()),
                64,
                t + 2.5,
                t + 0.05
            ]
        ); // 0 x, 1 y, 2 radius, 3 angle, 4 vel, 5 timer end, 6 timer resize
    }

    // If collides with player bullet, destroy
    //*
    for( var i = playerBullets.length - 1 ; i >= 0; --i){
        var distanceToPlayerBullet = distanceTo(e, playerBullets[i]);
        if(distanceToPlayerBullet <= 0){
            playerBullets.splice(i--, 1);
            enemies.splice(j--, 1);
        }
    }//*/
}

function drawEnemy(e){
    ctx.fillStyle	= "#d35400";
    ctx.strokeStyle	= "#d35400";
    // Draw cannon
    var tx = e[0] + Math.cos( (e[3]) ) * e[2];
    var ty = e[1] + Math.sin( (e[3]) ) * e[2];
    ctx.beginPath();
    ctx.arc( tx - cam[0], ty - cam[1], 8, 0, Math.PI * 2, true );
    ctx.fill();

    drawLine(e[0] - cam[0], e[1] - cam[1], e[3].toDeg(), 38, 6);
    // Draw body
    ctx.beginPath();
    ctx.arc( e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true );
    ctx.fill();
    // Draw some external lines
    ctx.strokeStyle	= "#ecf0f1";
    ctx.lineWidth	= 2;
    ctx.beginPath();
    ctx.arc(e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e[0] - cam[0], e[1] - cam[1], e[2] - 3, 0, Math.PI * 2, true);
    ctx.stroke();

    // Draw inside cabin
    ctx.save();
    ctx.fillStyle	= "#bdc3c7";
    translateTo(e);
    //ctx.rotate((t*50).toRad());
    ctx.fillRect(0 - 16, -8, 32, 16);
    ctx.restore();
    // Draw alien inside
    ctx.save();
    ctx.fillStyle	= "#27ae60";
    translateTo(e);
    // Body
    ctx.fillRect(- 4, 0, 8, 8);
    // Aerials
    ctx.fillRect(-4, -4, 2, 4);
    ctx.fillRect(2,  -4, 2, 4);
    // Eyes
    ctx.fillStyle	= "#2c3e50";
    ctx.fillRect(-3, 2, 2, 2);
    ctx.fillRect(0,  2, 2, 2);
    ctx.restore();
}

function createEnemies( number ){
    for( var i = number - 1; i >= 0; --i){
        var angle       = random(0, 360).toRad();
        var distance    = W/2;
        var enemy = [
            Math.cos(angle) * distance,// random(player[0] - 128, player[0] + 128),   // 0: x
            Math.sin(angle) * distance,// random(player[1] - 128, player[1] + 128),   // 1: y
            // player[0] + 64,
            // player[1] - 12,
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
