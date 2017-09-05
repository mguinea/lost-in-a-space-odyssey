var player = [
    0,      // 0: x
    0,      // 1: y
    64,     // 2: radius
    -90,    // 3: angle
    0,      // 4: force X
    0,      // 5: force Y
    0,      // 6: Control index for HAL
    100,    // 7: Acceleration
    0,      // 8: turret position up, down, left, right, 4 = direction
    10,     // 9: shooter delay
    0,      // 10: value of current shooter delay
    0.2,    // 11: shooter cadence
    100,    // 12: Life
    false,  // 13: hyperjump enabled
];
var lastPositionWithNoCollision = [];

function updatePlayer(){
    // Player dead
    if(player[12] <= 0){
        gameState = 3;
    }
    // Go where forces say
    player[0] += player[4] * dt;
    player[1] += player[5] * dt;
    //* Check collisions with asteroids
    for( var i = asteroids.length - 1 ; i >= 0; --i){
        if( collides(player, asteroids[i]) <= 0){
            var bounciness = 1;
            player[4] = -player[4] * bounciness;
            player[5] = -player[5] * bounciness;

            player[0] = lastPositionWithNoCollision[0];
            player[1] = lastPositionWithNoCollision[1];
        }else{
            lastPositionWithNoCollision[0] = player[0];
            lastPositionWithNoCollision[1] = player[1];
        }
    }
    //*/
    // Check collisions with passengers
    for( var i = passengers.length - 1 ; i >= 0; --i){
        if( collides(player, passengers[i]) <= 0){
            callDialog(2, [passengers.length - 1]);
            play(Apassenger);
            for(var j = 7; j >= 0; --j){
                var particle = [
                        passengers[i][0],
                        passengers[i][1],
                        random(12, 24),
                        random(0, 360),
                        24,
                        t + random(0.6, 1.0),
                        0.8,
                        [4],
                        2
                    ];
                spawnParticle(particle);
            }
            passengers.splice(i--, 1);
        }
    }
    // Check collisions with jump points
    for( var i = jumpPoints.length - 1 ; i >= 0; --i){
        if( collides(player, jumpPoints[i])){
            if(passengers.length > 0){
                player[13] = false;
                callDialog(3);
            }else{
                player[13] = true;
                callDialog(4);
            }
        }
    }
    // Check collisions with enemyBullets
    for( var i = enemyBullets.length - 1 ; i >= 0; --i){
        // First, check if AABB collides
        if( collides(player, enemyBullets[i]) <= 0){
            enemyBullets[i][2] = 24;
            play(Aexplosion1);
            enemyBullets.splice(i--, 1);
            if(player[12] >= 5){
                player[12] -= 5;
            }else{
                player[12] = 0;
            }
        }
    }
    // Check collisions with items
    for( var i = itemsLife.length - 1 ; i >= 0; --i){
        // First, check if AABB collides
        if( collides(player, itemsLife[i]) <= 0){
            play(Alife);
            playerAddLife(10);
            itemsLife.splice(i--, 1);
        }
    }
}

function drawPlayer(){
    // Draw propeller
    setContextAtrribute(12, 0);
    setContextAtrribute(12, 1);
    var op = getOrbitPosition(player, player[3] + 180, player[2] + 2);
    ctx.lineWidth = 2;
	strokePath(op[0], op[1], player[3] + 180 + 90, propellerPts, 5).fill();
    // Draw turret selection by player
    setContextAtrribute(17, 1);
    if(player[8] < 4){
        fillCircle( player[0] + turretsPositions[player[8]][0],   player[1] + turretsPositions[player[8]][1], 10);
    }
    // Draw turrets
    setContextAtrribute(16, 1);
    setContextAtrribute(16, 0);
    fillCircle( player[0],   player[1] - player[2], 8);
    drawLine(   player[0],   player[1] - player[2], turretsAngles[0], 12, 6);
    fillCircle( player[0],   player[1] + player[2], 8);
    drawLine(   player[0],   player[1] + player[2], turretsAngles[1], 12, 6);
    fillCircle( player[0] - player[2], player[1], 8);
    drawLine(   player[0] - player[2], player[1], turretsAngles[2], 12, 6);
    fillCircle( player[0] + player[2], player[1], 8);
    drawLine(   player[0] + player[2], player[1], turretsAngles[3], 12, 6);
    // Draw body
    setContextAtrribute(8, 1);
    fillCircle(player[0], player[1], player[2]);
    // Draw room
    setContextAtrribute(14, 1);
    fillRectangle(player[0] - 50, player[1] - 8, 100, 38);
    // Draw life UI
    setContextAtrribute(16, 1);
    fillRectangle(player[0] - 35, player[1] + 36, 70, 6);
    setContextAtrribute(4, 1);
    fillRectangle(player[0] - 35, player[1] + 36, player[12] / 100 * 70, 6);
    // Draw rudder
    setContextAtrribute(10, 0);
    ctx.lineWidth = 2;
    strokeCircle(player[0], player[1] + 12, 8)
    for(var i = 8; i >= 0; --i){
        drawLine(player[0], player[1] + 12, (i * 45 + player[3] * 10), 12, 2);
    }
    // Draw control selection by player
    setContextAtrribute(17, 1);
    if(player[8] < 4){
        fillCircle( player[0] + shipPositions[player[8]][0], player[1], 7 );
    }
    // Draw controls
    for(var i = turretsAngles.length - 1; i >= 0; --i){
        drawControl(player[0] + shipPositions[i][0], player[1], turretsAngles[i]);
    }
    // Draw some external lines
    setContextAtrribute(17, 0);
    ctx.lineWidth = 1;
    strokeCircle(player[0], player[1], player[2] - 2);
    strokeCircle(player[0], player[1], player[2] - 5);
    // Draw Character
    drawCharacter();
    // Draw HAL
    // Draw minimap
    drawMinimap();
}

function drawControl(x, y, a){
	ctx.lineWidth = "2";
    setContextAtrribute(9, 1);
    fillCircle(x, y, 6);
    setContextAtrribute(16, 0);
    for(var i = 4; i >= 0; --i){
        drawLine(x, y, a + i * 90, 4, 2);
    }
}

function drawMinimap(){
    var mmapx   = player[0],
        mmapy   = player[1] - 33,
        mmapr   = 22;
    setContextAtrribute(10, 1);
    fillCircle(mmapx, mmapy, mmapr);
    var ptsArrow = [
        [0, 0],
        [-5, -3],
        [-5, 3],
        [0, 0]
    ];
    drawMiniArrow(mmapx, mmapy, mmapr, ptsArrow, enemies, 16);
    drawMiniArrow(mmapx, mmapy, mmapr, ptsArrow, passengers, 4);
    drawMiniArrow(mmapx, mmapy, mmapr, ptsArrow, jumpPoints, 6);
}

function drawMiniArrow(mmapx, mmapy, mmapr, ptsArrow, items, color){
    // Draw enemies
    for(var i = items.length - 1; i >= 0; --i){
        var angle       = angleTo([mmapx, mmapy], items[i]).toDeg(),
            orbitPos    = getOrbitPosition([mmapx, mmapy], angle, mmapr);
        setContextAtrribute(color, 1);
        setContextAtrribute(color, 0);
        strokePath(orbitPos[0], orbitPos[1], angle, ptsArrow, 1).fill();
    }
}

function playerAddLife(amount){
    player[12] += amount;
    if( player[12] > 100){
        player[12] = 100;
    }
}
