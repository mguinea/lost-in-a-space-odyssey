// ------------------
// Game
// ------------------
function init(){
    createStars();
    createEnemies(6);
    ctx.scale(scale, scale);
    // Create backStars ingame
    for(var i = 128; i > 0; --i){
        backStars.push( [random(-W/2, W), random(-H/2, H), random(1, 3)] );
    }
    // Create backStars menu
    for(var i = 128; i > 0; --i){
        backStarsMenu.push( [W/2, H/2, 1, random(0, 360).toRad()] );
    }
    // Call game loop for action!
    gameLoop();
}

function update(){
    switch(gameState){
        case 0:
            processGroup( backStarsMenu, updateBackStarsMenu );
            // Spawn stars randomly
            /*if(backStars.length < 128){
                backStars.push( [W/2, H/2, 1, random(0, 360).toRad()] )
            }*/
            inputsInMenu();
        break;
        case 1:
            turretSelected = player[8];
            // Manage input
            inputsInGame();
            // If there are no enemies, and enemies timer > some time (in seconds), instantiate multiple enemies (random from 2 to 5)
            /*if( enemies.length <= 0 && enemiesWaveCounter >= 10){
                enemiesWaveCounter = 0;
                createEnemies(random(3, 5));
            }*/
            enemiesWaveCounter += t;
            // Update groups
            processGroup( backStars, updateBackStars );
            processGroup( stars, updateStar );
            processGroup( playerBullets, updatePlayerBullet );
            processGroup( enemyBullets, updateEnemyBullet );
            processGroup( enemies, updateEnemy );
            // Update HAL
            updateHal();
            // Update player
            updatePlayer();

            //console.log(backStars[0][0]);
            // Cam focus on player
            camFocus( player );
        break;
    }
}

function draw(){
    // Clear screen
    setContextAtrribute(0, 1);
    ctx.fillRect(0, 0, W + W * scale, H + H * scale);
    switch(gameState){
        case 0:
            processGroup( backStarsMenu, drawBackStarsMenu );
            // Draw title
            /*
            ctx.fillStyle   = '#ecf0f1';
            ctx.font        = "64px sans-serif";
            ctx.textAlign   = "center";
            ctx.fillText("Lost in a Space Odyssey", W/2, 128);
            //*/
            ctx.save();
            var colorIndex = (~~(t * 24) % colors.length);
            ctx.strokeStyle = colors[colorIndex];
            ctx.globalAlpha = 0.3;
            ctx.globalAlpha = 1;
            ctx.translate(W/2, 140);
            font("LOST IN A SPACE ODYSSEY", 2.5);
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
        break;
        case 1:
            // Draw groups
            processGroup( backStars, drawBackStar );
            processGroup( stars, drawStar );
            processGroup( enemies, drawEnemy );
            processGroup( playerBullets, drawPlayerBullet );
            processGroup( enemyBullets, drawEnemyBullet );

            // Draw player
            drawPlayer();
            drawHal();

            // Draw dialogs
            //showDialog(0);
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
    if(pressing[90]){ // Key Z
        scale = 2;
    }
    if(pressing[32] && t > player[10]){ // Key SPACE
        // SFX
        play(Amusic1);
        // Update shooter timer
        player[10] = t + player[11];

        var turretSelected = player[8];
        // calculate x y position, turret 0 (top) and add some random angle
        var x = -Math.cos(turretsAngles[turretSelected].toRad()) * 18,
            y =  Math.sin(turretsAngles[turretSelected].toRad()) * 18;
        playerBullets.push([
            player[0] + turretsPositions[turretSelected][0] + x,
            player[1] + turretsPositions[turretSelected][1] + y,
            12,
            random(turretsAngles[turretSelected] - 7, turretsAngles[turretSelected] + 7),
            200,
            t + 1.5,
            t + 0.05]); // 0 x, 1 y, 2 radius, 3 angle, 4 vel, 5 timer end, 6 timer resize
    }
    if(pressing[65]){ // Key A
        player[3] += 64 * dt;
        //turretsAngles[turretSelected] += 64 * dt;

        //if(turretsAngles[turretSelected] < -30){
            turretsAngles[player[8]] += 100 * dt;
        //}
    } else
    if(pressing[68]){ // Key D
        player[3] -= 64 * dt;
        //turretsAngles[turretSelected] -= 64 * dt;

        //if(turretsAngles[turretSelected] > -150){
            turretsAngles[player[8]] -= 100 * dt;
        //}
    }
    if(pressing[87]){ // Key W

        var maxVel = 200; // 25
        var forceX = player[4];
        var forceY = player[5];
        if(Math.abs(forceX) <= maxVel){
            player[4] += player[7] * Math.cos(player[3] * Math.PI / 180) * dt;
        }
        if(Math.abs(forceY) <= maxVel){
            player[5] += player[7] * Math.sin(player[3] * Math.PI / 180) * dt;
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
        /*if(player[8] > 0){
            player[8] -=1;
        }*/
        player[8] = 2;
    }else
    if(pressing[39]){ // Right arrow
        /*if(player[8] < shipPositions.length - 1){
            player[8] +=1;
        }*/
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

function createStars(){
    var star = [
        -256,   // 0: x
        64,   // 1: y
        128,     // 2: radius
        0,      // 3: rotation
        "#f1c40f",   // 4: color
        5,     // 6: rotation velocity
    ];
    //stars.push( star );
}
