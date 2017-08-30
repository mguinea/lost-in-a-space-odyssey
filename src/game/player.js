var player = [
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
    100,    // 12: Life
];

function updatePlayer(){
    // Go where forces say
    player[0] += player[4] * dt;
    player[1] += player[5] * dt;
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
