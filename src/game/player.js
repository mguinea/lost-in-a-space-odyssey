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
    0.5,    // 11: shooter cadence
    100,    // 12: Life
    false,  // 13: hyperjump enabled
    100,    // 14: laser energy
];
var lastPositionWithNoCollision = [];

var turrets = [
    [
        -90,        // 0: initial angles
        -90,        // 1: current angles
        [0, -64],   // 2: positions
        0           // 3: active
    ], // UP
    [
        90,         // 0: initial angles
        90,         // 1: current angles
        [0, 64],    // 2: positions
        0           // 3: active
    ], // DOWN
    [
        180,        // 0: initial angles
        180,        // 1: current angles
        [-64, 0],   // 2: positions
        0           // 3: active
    ], // LEFT
    [
        0,          // 0: initial angles
        0,          // 1: current angles
        [64, 0],    // 2: positions
        0           // 3: active
    ] // RIGHT
]; // turrets index: 0 up, 1 down, 2 left, 3 right

var playerLasers = [
    [0, 0, 0, 128, 1, 1],  // 0: x, 1: y, 2: r, 3: l, 4: w, 5: color
    [0, 0, 0, 128, 1, 1]
];

function updatePlayer(){
    //* Player dead
    if(player[12] <= 0){
        gameState = 3;
        return;
    }
    //*/
    //* Go where forces say
    player[0] += player[4] * dt;
    player[1] += player[5] * dt;
    //*/
    var mpInScreen  = getMousePositionInScreen(),
        mpInWorld   = getMousePositionInWorld();
    //* Activate / deactivate turrets
    turrets[0][3] = (mpInScreen[1] < 0) ? 1 : 0;
    turrets[1][3] = (mpInScreen[1] > 0) ? 1 : 0;
    turrets[2][3] = (mpInScreen[0] < 0) ? 1 : 0;
    turrets[3][3] = (mpInScreen[0] > 0) ? 1 : 0;
    //*/
    //* Update turrets angles
    for(var i = turrets.length - 1; i >= 0; --i){
        if(turrets[i][3] === 1){
            turrets[i][1] = angleTo([player[0] + turrets[i][2][0], player[1] + turrets[i][2][1]], mpInWorld).toDeg();
        }
    }
    //*/
    //* Shot if click
    if(mouse[3] == 1 && t > player[10]){
        playerShot();
    }
    //*/
    //* Laser if right click
    if(mouse[3] == 2){
        playerLaserUpdate();
    }
    //*/
    //* Regulate laser temp
    if(player[14] <= 100 && mouse[3] != 2){
        player[14] += 7 * dt;
    }
    if(player[14] > 100){
        player[14] = 100;
    }
    //*/
    //* Move propeller and go
    if(pressing[65]){ // Key A
        player[3] += 64 * dt;
    }else if(pressing[68]){ // Key D
        player[3] -= 64 * dt;
    }
    if(pressing[87]){ // Key W
        var maxVel = 36;
        var forceX = player[4];
        var forceY = player[5];
        if(Math.abs(forceX) <= maxVel){
            player[4] += player[7] * Math.cos(player[3] * Math.PI / 180) * dt;
        }
        if(Math.abs(forceY) <= maxVel){
            player[5] += player[7] * Math.sin(player[3] * Math.PI / 180) * dt;
        }
        // Add particles
        // (~~(elapsedTime * framesPerSecond) % totalFrames)
        if((~~(t * 60) % 10) == 0){
            var propellerPos = getOrbitPosition(player, player[3] + 180, player[2]+12),
                particle = [
                    propellerPos[0],
                    propellerPos[1],
                    random(5, 9),
                    player[3] + 180 + random(-7, 7),
                    12,
                    t + random(0.6, 1.0),
                    0.8,
                    [15, 16, 11, 12],
                    0
                ];
            spawnParticle(particle);
        }
        // Max forces correction
        if(player[4] > maxVel){
            player[4] = maxVel;
        }else if(player[4] < -maxVel){
            player[4] = -maxVel;
        }
        if(player[5] > maxVel){
            player[5] = maxVel;
        }else if(player[5] < -maxVel){
            player[5] = -maxVel;
        }
    }
    //*/
    //* Check collisions with asteroids
    for( var i = asteroids.length - 1 ; i >= 0; --i){
        if( collides(player, asteroids[i]) <= 0){
            player[12] -= 5;
            
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
    //* Check collisions with passengers
    for( var i = passengers.length - 1 ; i >= 0; --i){
        if( collides(player, passengers[i]) <= 0){
            callDialog(2);
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
                        0
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
    //*/
}

function drawPlayer(){
    //* Draw propeller
    setContextAtrribute(12, 0);
    setContextAtrribute(12, 1);
    var op = getOrbitPosition(player, player[3] + 180, player[2] + 2);
    ctx.lineWidth = 2;
	strokePath(op[0], op[1], player[3] + 180 + 90, propellerPts, 5).fill();
    //*/
    //* Draw turrets
    for(var i = turrets.length - 1; i >= 0; --i){
        // if active, draw selection
        if(turrets[i][3] === 1){
            setContextAtrribute(17, 1);
            fillCircle( player[0]+ turrets[i][2][0], player[1] + turrets[i][2][1], 10);
        }
        // Draw red turret
        setContextAtrribute(16, 1);
        setContextAtrribute(16, 0);
        fillCircle( player[0] + turrets[i][2][0], player[1] + turrets[i][2][1], 8);
        drawLine(   player[0] + turrets[i][2][0], player[1] + turrets[i][2][1], turrets[i][1], 12, 6);
    }
    //*/
    // Draw ship
    setContextAtrribute(8, 1);
    fillCircle(player[0], player[1], player[2]);
    // Draw room
    setContextAtrribute(20, 1);
    fillRectangle(player[0] - 50, player[1] - 8, 100, 38);
    // Draw Character
    drawCharacter();
    //* Draw rudder
    setContextAtrribute(10, 0);
    ctx.lineWidth = 2;
    strokeCircle(player[0] - 12, player[1] + 28, 8)
    for(var i = 8; i >= 0; --i){
        drawLine(player[0] - 12, player[1] + 28, (i * 45 + player[3] * 10), 12, 2);
    }
    //*/
    //* Draw Player / Rudder overlap
    setContextAtrribute(8, 1);
    fillCircle(player[0], player[1] - 8, player[2], 0.8, 0.2);
    // Draw life UI
    setContextAtrribute(16, 1);
    fillRectangle(player[0] - 35, player[1] + 38, 70, 6);
    setContextAtrribute(4, 1);
    fillRectangle(player[0] - 35, player[1] + 38, player[12] / 100 * 70, 6);
    //*/
    //* Draw laser energy UI
    setContextAtrribute(16, 1);
    fillRectangle(player[0] - 35, player[1] - 42, 3, 32);
    setContextAtrribute(6, 1);
    fillRectangle(player[0] - 35, player[1] - 42, 3, player[14] / 100 * 32);
    //*/
    //* Draw controls
    setContextAtrribute(17, 1);
    if(turrets[0][3] === 1){ fillCircle( player[0] - 42, player[1] + 30, 7 ); }
    if(turrets[1][3] === 1){ fillCircle( player[0] - 30, player[1] + 30, 7 ); }
    if(turrets[2][3] === 1){ fillCircle( player[0] + 30, player[1] + 30, 7 ); }
    if(turrets[3][3] === 1){ fillCircle( player[0] + 42, player[1] + 30, 7 ); }
    drawControl(player[0] - 42, player[1] + 30, turrets[0][1]);
    drawControl(player[0] - 30, player[1] + 30, turrets[1][1]);
    drawControl(player[0] + 30, player[1] + 30, turrets[2][1]);
    drawControl(player[0] + 42, player[1] + 30, turrets[3][1]);
    //*/
    //*/
    // Draw some external lines
    setContextAtrribute(17, 0);
    ctx.lineWidth = 1;
    strokeCircle(player[0], player[1], player[2] - 2);
    strokeCircle(player[0], player[1], player[2] - 5);
    //* Draw minimap
    drawMinimap();
    //*/
    //* Laser if right click
    if(mouse[3] == 2){
        playerLaserDraw();
    }
    //*/
}

function drawControl(x, y, r){
	ctx.lineWidth = "2";
    setContextAtrribute(9, 1);
    fillCircle(x, y, 6);
    setContextAtrribute(16, 0);
    for(var i = 4; i >= 0; --i){
        drawLine(x, y, r + i * 90, 4, 2);
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

function playerShot(){
    // SFX
    play(ApShot);
    // Spawn bullet on active turrets
    for(var i = turrets.length -1; i >= 0; --i){
        if(turrets[i][3] === 1){
            // Update shooter timer
            player[10] = t + player[11];
            var op = getOrbitPosition([turrets[i][2][0], turrets[i][2][1]], turrets[i][1], 18);
            var bullet = [
                player[0] + op[0],
                player[1] + op[1],
                12,
                /*random(turrets[i][1] - 7, turrets[i][1] + 7),*/
                turrets[i][1],
                200,
                t + 1.5,
                t + 0.05];
            poolSpawnItem(playerBullets, bullet, 7);
        }
    }
}

function playerLaserUpdate(){
    var mpInWorld           = getMousePositionInWorld(),
        laserIndex          = 0;
    for(var i = turrets.length - 1; i >= 0; --i){
        if(turrets[i][3] === 1){
            var op  = getOrbitPosition([player[0] + turrets[i][2][0], player[1] + turrets[i][2][1]], turrets[i][1], 12),
                r   = angleTo([op[0], op[1]], mpInWorld).toDeg();
            playerLasers[laserIndex][0] = op[0];
            playerLasers[laserIndex][1] = op[1];
            playerLasers[laserIndex][2] = r;
            playerLasers[laserIndex][3] = 500;
            playerLasers[laserIndex][5] = 1;
            ++laserIndex;
        }
    }
}

function playerLaserDraw(){
    for(var i = playerLasers.length - 1; i >= 0; --i){
        // 0: x, 1: y, 2: r, 3: l, 4: w, 5: color
        setContextAtrribute(playerLasers[i][5], 1);
        setContextAtrribute(playerLasers[i][5], 0);
        drawLine(playerLasers[i][0], playerLasers[i][1], playerLasers[i][2], playerLasers[i][3], playerLasers[i][4]);
    }
}
