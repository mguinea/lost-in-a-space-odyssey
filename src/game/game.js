// ------------------
// Game
// ------------------
function init(){
    // Create scene with random seed (first time, not random)
    createScene(1);
    // Create backStars menu
    for(var i = 128; i >= 0; --i){
        var angle           = random(0, 360);
        var op              = getOrbitPosition([W/2, H/2], angle, W);
        var angleDirection  = angleTo([W/2, H/2], [op[0], op[1]]);
        backStarsMenu.push( [op[0], op[1], 0, angleDirection, t + random(0.1, 1.5)] );
    }
    // Select dialog to show at the beginning
    // callDialog(0);
    // Call game loop for action!
    gameLoop();
}

function update(){
    switch(gameState){
        case 0:
            processGroup( backStarsMenu, updateBackStarsMenu );
            inputsInMenu();
            camFocus( [W/2, H/2] );
        break;
        case 1:
            camFocus( player );
            // Manage input
            inputsInGame();
            // Update groups
            processGroup( backStars, updateBackStars );
            processGroup( stars, updateStar );
            processGroup( playerBullets, updatePlayerBullet );
            processGroup( enemyBullets, updateEnemyBullet );
            processGroup( enemies, updateEnemy );
            processGroup( passengers, updatePassenger );
            processGroup( jumpPoints, updateJumpPoint );
            processGroup( particles, updateParticle );
            processGroup( asteroids, updateAsteroid );
            processGroup( itemsLife, updateItemLife );
            // Update HAL
            updateHal();
            // Update dialog logic
            updateDialog();
            // Update player
            updatePlayer();
            // Spawn enemy wave
            if(t >= enemyWave[0] && enemyWave[1] == 1){
            	callDialog(1);
                enemyWave[1] = 0;
                for(var i = random(1, 5) - 1; i >= 0; --i){
                    var op = getOrbitPosition(player, random(0, 360), random(W, W + 256)),
                    enemy = [
                        op[0],
                        op[1],
                        24,
                        0,
                        0,
                        0,
                        t + 5,
                        100,
                        1,
                        100
                    ];
                    enemies.push( enemy );
                }
            };
            // Cam focus on player
            camFocus( player );
        break;
        case 2:
            // Cam focus center screen
            camFocus( [W/2, H/2] );
            // Manage input
            inputsInGame();
            // Update player
            updatePlayer();
            // Move stars
            processGroup( backStarsMenu, updateBackStarsMenu );
            // During some time
            if(t >= hyperSpaceEnd){
                hyperSpace  = false;
                gameState   = 1;
                // Drop current scene configs and call a new onedrive
                destroyScene();
                createScene(random(2, 1000));
                player[0] = 0;
                player[1] = 0;
                player[13] = false;
            }

        break;
        case 3:
            // Cam focus on player
            camFocus( player );
        break;
    }
}

function draw(){
    switch(gameState){
        case 0:
            setContextAtrribute(0, 1);
            ctx.fillRect(0, 0, W + W * scale, H + H * scale);

            processGroup( backStarsMenu, drawBackStarsMenu );
            // Draw title
            ctx.save();
            var colorIndex = (~~(t * 24) % colors.length - 1);
            ctx.strokeStyle = colors[colorIndex];
            ctx.globalAlpha = 0.3;
            ctx.globalAlpha = 1;
            ctx.translate(W/2, 140);
            font("LOST IN A SPACE ODYSSEY", 2.5, 0, 5);
            ctx.restore();

            // Draw press enter to start
            // (~~(elapsedTime * framesPerSecond) % totalFrames);
            var c = (~~(t * 2) % 2);
            if(c == 1){
                ctx.save();
                ctx.strokeStyle = '#ecf0f1';
                ctx.globalAlpha = 0.3;
                ctx.globalAlpha = 1;
                ctx.translate(W / 2, H /2 + 64);
                font("PRESS ENTER", 1);
                ctx.restore();
            }

            // Draw credits
            ctx.save();
            setContextAtrribute(17, 0);
            ctx.translate(W/2, H - 64);
            font("MADE BY MARC GUINEA FOR JS13K GAMES 2017", 0.8, 0, 1);
            ctx.restore();
        break;
        case 1:
            setContextAtrribute(27, 1);
            ctx.fillRect(0, 0, W + W * scale, H + H * scale);

            processGroup( backStars, drawBackStar );
            processGroup( stars, drawStar );
            processGroup( asteroids, drawAsteroid );
            processGroup( enemies, drawEnemy );
            processGroup( playerBullets, drawPlayerBullet );
            processGroup( enemyBullets, drawEnemyBullet );
            processGroup( passengers, drawPassenger );
            processGroup( jumpPoints, drawJumpPoint );
            processGroup( particles, drawParticle );
            processGroup( itemsLife, drawItemLife );


            // Draw player
            drawPlayer();
            // Draw mouse
            drawMouse();
            // Draw dialogs
            drawHALDialog();


            ctx.save();
            setContextAtrribute(17, 0);
            setContextAtrribute(17, 1);
            ctx.translate(W/2, H - 64);
            ctx.fillText("ANGLE" + turretsAngles[0], 0, 0);
            ctx.restore();
        break;
        case 2:
            setContextAtrribute(28, 1);
            ctx.fillRect(0, 0, W + W * scale, H + H * scale);

            processGroup( backStarsMenu, drawBackStarsMenu );
            // Draw player
            drawPlayer();
        break;
        case 3:
            setContextAtrribute(0, 1);
            ctx.fillRect(0, 0, W + W * scale, H + H * scale);
            drawPlayer();

        break;
    }
    // Draw shader effects
    drawPostProcessing();
}

function inputsInMenu(){
    if(pressing[13]){ // Enter
        gameState = 1;
        // Reset game timer
        t = 0;
    }
}

function inputsInGame(){
    if(pressing[72] && player[13] == true && gameState == 1){ // Key H
        play(Ahyperspace);
        gameState = 2;
        hyperSpace = true;
        hyperSpaceEnd = t + 3.5;
        player[0] = W/2;
        player[1] = H/2;
    }

    if(pressing[32] && t > player[10] && player[8] != 4){ // Key SPACE
        // SFX
        play(ApShot);
        // Update shooter timer
        player[10] = t + player[11];

        // origin, angle, distance
        /*var op = getOrbitPosition([turretsPositions[player[8]][0], turretsPositions[player[8]][1]], turretsAngles[player[8]], 18);
        playerBullets.push([
            player[0] + op[0],
            player[1] + op[1],
            12,
            random(turretsAngles[player[8]] - 7, turretsAngles[player[8]] + 7),
            200,
            t + 1.5,
            t + 0.05]); // 0 x, 1 y, 2 radius, 3 angle, 4 vel, 5 timer end, 6 timer resize
        */
        var op = getOrbitPosition([turretsPositions[player[8]][0], turretsPositions[player[8]][1]], turretsAngles[player[8]], 18);
        var bullet = [
            player[0] + op[0],
            player[1] + op[1],
            12,
            random(turretsAngles[player[8]] - 7, turretsAngles[player[8]] + 7),
            200,
            t + 1.5,
            t + 0.05];
        poolSpawnItem(playerBullets, bullet, 7);
    }
    if(pressing[65]){ // Key A
        if(player[8] == 4){
            player[3] += 64 * dt;
        }else{
            if(player[8] == 0 || player[8] == 3 || player[8] == 2){
                if(turretsAngles[player[8]] > turretsAnglesInitial[player[8]] - 65){
                    turretsAngles[player[8]] -= 100 * dt;
                }
            }else if(player[8] == 1){
                if(turretsAngles[player[8]] < turretsAnglesInitial[player[8]] + 65){
                    turretsAngles[player[8]] += 100 * dt;
                }
            }
        }
    } else
    if(pressing[68]){ // Key D
        if(player[8] == 4){
            player[3] -= 64 * dt;
        }else{
            if(player[8] == 0 || player[8] == 3 || player[8] == 2){
                if(turretsAngles[player[8]] < turretsAnglesInitial[player[8]] + 65){
                    turretsAngles[player[8]] += 100 * dt;
                }
            }else if(player[8] == 1){
                if(turretsAngles[player[8]] > turretsAnglesInitial[player[8]] - 65){
                    turretsAngles[player[8]] -= 100 * dt;
                }
            }
        }
    }
    if(pressing[87]){ // Key W
        player[8] = 4;
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

    // Move player controls
    if(pressing[38]){ // Up arrow
        player[8] = 0;
    }else
    if(pressing[40]){ // Down arrow
        player[8] = 1;
    }else
    if(pressing[37]){ // Left arrow
        player[8] = 2;
    }else
    if(pressing[39]){ // Right arrow
        player[8] = 3;
    }

    // HAL Actions
    if(pressing[97] || pressing[49]){ // Num pad 1 || number 1
        hal[5] = 0;  // Go to UP torret
    }else if(pressing[98] || pressing[50]){
        hal[5] = 1;  // Go to DOWN torret
    }else if(pressing[99] || pressing[51]){
        hal[5] = 2;  // Go to LEFT torret
    }else if(pressing[100] || pressing[52]){
        hal[5] = 3;  // Go to RIGHT torret
    }
}

function destroyScene(){
    passengers = [];
    asteroids = [];
    jumpPoints = [];
    backStars = [];
    enemies = [];
}

function createScene(s){
    // Generate random seed for this scene
    window.seed = s || 0;
    /* Create passengers
    for(var i = random(1, 3) - 1; i >= 0; --i){
        var op  = getOrbitPosition([0, 0], random(0, 360), random(512, 1024));
        passengers.push([
            op[0],
            op[1],
            20,
            random(0, 360)
        ]);
    }
    //*/
    /* Create asteroids
    for(var i = passengers.length - 1; i >= 0; --i){
        for(var j = random(6, 12) - 1; j >= 0; --j){
            var op  = getOrbitPosition([passengers[i][0], passengers[i][1]], random(0, 360), random(128, 1024));
            var asteroid = [
                op[0],
                op[1],
                100,
                random(0, 360),
                0, 0, 150, 1];
            if(!collides(player, asteroid)){
                asteroids.push(asteroid);
            }
        }
    }
    //*/
    /* Create jump points
    for(var i = random(1, 3) - 1; i >= 0; --i){
        var op  = getOrbitPosition(player, random(0, 360), random(1024, 1500));
        jumpPoints.push([
            op[0],
            op[1],
            128,
            random(0, 360)
        ]);
    }

    /* TEST
    jumpPoints.push([
        64,
        64,
        128,
        random(0, 360)
    ]);
    //*/
    //*/
    /* Create stars
    for(var i = random(1, 3) - 1; i >= 0; --i){
        var op  = getOrbitPosition([0, 0], random(0, 360), random(512, 1024));
        var star = [
            -512,       // 0: x
            512,        // 1: y
            512,        // 2: radius
            0,          // 3: rotation
            11,         // 4: color
        ];
        stars.push( star );
    }
    //*/

    // Create enemy wave
    //createWaveEnemy();

    initParticles();

    //createBackStars();
}

function createBackStars(){
    for(var i = 128; i > 0; --i){
        backStars.push( [random(-W/2, W/2), random(-H/2, H/2), random(1, 3)] );
    }
}
