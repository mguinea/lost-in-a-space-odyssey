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
    callDialog(0);
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
                        t + 3,
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
            // Draw score
            ctx.save();
            ctx.strokeStyle = '#ecf0f1';
            ctx.translate(W - 128, 64);
            font("     SCORE: " + score, 1, -1, 1);
            ctx.restore();

            ctx.save();
            ctx.strokeStyle = '#ecf0f1';
            ctx.translate(W - 128, 80);
            font("BEST SCORE: " + scores[0], 1, -1, 1);
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
    //* Create passengers
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
    //* Create asteroids
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
    //* Create jump points
    for(var i = random(1, 3) - 1; i >= 0; --i){
        var op  = getOrbitPosition(player, random(0, 360), random(1024, 1500));
        jumpPoints.push([
            op[0],
            op[1],
            128,
            random(0, 360)
        ]);
    }

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
    createWaveEnemy();

    initParticles();

    //* Create backstars
    for(var i = 128; i > 0; --i){
        backStars.push( [random(-W/2, W/2), random(-H/2, H/2), random(1, 3)] );
    }
    //*/
}
