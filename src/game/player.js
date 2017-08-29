var player = [
    0,      // 0: x
    0,      // 1: y
    64,     // 2: radius
    -180,     // 3: angle
    0,      // 4: force X
    0,      // 5: force Y
    0,      // 6: Control index for HAL
    100,    // 7: Acceleration
    0,      // 8: turret position up, down, left, right, 4 = direction
    10,     // 9: shooter delay
    0,      // 10: value of current shooter delay
    0.2,    // 11: shooter cadence
    100,    // 12: Life
];

function updatePlayer(){
    // Go where forces say
    player[0] += player[4] * dt;
    player[1] += player[5] * dt;
}

function drawPlayer(){
    // Draw propeller
    setContextAtrribute(18, 1);
    var op = getOrbitPosition(player, player[3], player[2]);
    fillCircle(op[0], op[1], 8);
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
    setContextAtrribute(3, 1);
    fillRectangle(player[0] - 35, player[1] + 36, player[12] / 100 * 70, 6);
    // Draw rudder
    setContextAtrribute(10, 0);
    ctx.lineWidth = 2;
    strokeCircle(player[0], player[1] + 12, 8)
    for(var i = 8; i >= 0; --i){
        drawLine(player[0], player[1] + 12, (i * 45 + player[3] * 10), 12, 2);
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
    ctx.lineWidth = 2;
    setContextAtrribute(5, 0);
    strokeCircle(player[0], player[1] - 33, 22);
    fillCircle(player[0], player[1] - 33, 21);
    // Draw enemies
    // Draw passengers
}
