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
    // Draw some external lines
    setContextAtrribute(17, 0);
    strokeCircle(player[0], player[1], player[2] - 2);
    strokeCircle(player[0], player[1], player[2] - 5);
    // Draw room
    setContextAtrribute(14, 1);
    fillRoundRect(player[0] - player[2] / 2 + 6, player[1] - 6, player[2] * 2 - 24, 38, 8).fill();
    /*
    var px  = player[0] - cam[0],
        py  = player[1] - cam[1];
        r   = player[2]
        a   = player[3];
    ctx.save();
    // Draw propeller
    var tx = px - Math.cos( (a).toRad() ) * r;
    var ty = py + Math.sin( (-a).toRad() ) * r;
    ctx.fillStyle	= "#839394";
    ctx.beginPath();
    ctx.arc( tx, ty, 8, 0, Math.PI * 2, true );
    ctx.fill();
    // Draw turrets
    setContextAtrribute(45, 1);
    ctx.beginPath();
    ctx.arc(px, py - r, 12, 0, Math.PI * 2, true);
    ctx.arc(px, py + r, 12, 0, Math.PI * 2, true);
    ctx.arc(px - r, py, 12, 0, Math.PI * 2, true);
    ctx.arc(px + r, py, 12, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.strokeStyle = '#c0392b';
    drawLine(px, py - r, turretsAngles[0], 18, 6);
    drawLine(px, py + r, turretsAngles[1], 18, 6);
    drawLine(px - r, py, turretsAngles[2], 18, 6);
    drawLine(px + r, py, turretsAngles[3], 18, 6);

    // Draw ship
    setContextAtrribute(41, 1);
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2, true);
    ctx.fill();
    // Draw room
    setContextAtrribute(49, 1);
    ctx.roundRect(px - r + 12, py - r / 6, r * 2 - 24, 38, 8).fill();
    // Draw life UI
    ctx.lineWidth   = "1";
    ctx.strokeStyle	= "#ecf0f1";
    ctx.roundRect(px - r + 24, py + 36, 80, 6, 8).stroke();
    ctx.fillStyle	= "#c0392b";
    ctx.roundRect(px - r + 24, py + 36, 80, 6, 8).fill();
    ctx.fillStyle	= "#3498db";
    ctx.roundRect(px - r + 24, py + 36, player[12] / 100 * 80, 6, 8).fill();
    // Draw external lines
    ctx.strokeStyle	= "#FA751E";
    ctx.lineWidth	= 2;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px, py, r - 3, 0, Math.PI * 2, true);
    ctx.stroke();
    // Draw cogs
    playerDrawCog(-38, -24, 12, 8, 8, 1);
    // Draw controls
    ctx.fillStyle   = "#7f8c8d";
    drawControlCross(player[0] + shipPositions[0][0], player[1] + shipPositions[0][1], turretsAngles[0]);
    drawControlCross(player[0] + shipPositions[1][0], player[1] + shipPositions[1][1], turretsAngles[1]);
    drawControlCross(player[0] + shipPositions[2][0], player[1] + shipPositions[2][1], turretsAngles[2]);
    drawControlCross(player[0] + shipPositions[3][0], player[1] + shipPositions[3][1], turretsAngles[3]);
    // Draw rudder
    //ctx.lineWidth = 2;
    var rudderCenterX = player[0] + 3;
    var rudderCenterY = player[1] + 12;
    ctx.strokeStyle	= "#2c3e50";
    ctx.beginPath();
    ctx.arc( rudderCenterX - cam[0], rudderCenterY - cam[1], 8, 0, Math.PI * 2, true );
    ctx.stroke();
    for(var i = 0; i < 8; ++i){
        drawCircleArm(rudderCenterX, rudderCenterY, i * 45, 12);
    }
    // Draw Character
    ctx.fillStyle = "#2c3e50";
    var bounceY = Math.sin(t * 4);
    var chx = player[0] - cam[0]        + shipPositions[player[8]][0];
    var chy = player[1] + 10 - cam[1]   + shipPositions[player[8]][1] + 9;
    // Legs
    ctx.fillRect(chx + 2, chy + 10, 3, 6);
    ctx.fillRect(chx + 7, chy + 10, 3, 6);
    // Arms
    ctx.fillRect(chx + 2, chy + 12, 3, 2);
    ctx.fillRect(chx + 7, chy + 12, 3, 2);
    // Body
    ctx.fillRect(chx, chy + bounceY, 12, 12);
    // Head
    ctx.fillRect(chx + 2, chy - 7 + bounceY, 9, 8);
    // Eyes
    setContextAtrribute(46, 1);
    ctx.fillRect(chx + 3, chy  - 6 + bounceY, 3, 3);
    ctx.fillRect(chx + 7, chy  - 6 + bounceY, 3, 3);

    ctx.restore();*/
}

function playerDrawCog(x, y, angularOffset, size, arms, reverse){
    ctx.save();
    ctx.fillStyle	= "#2c3e50";
    ctx.strokeStyle	= "#2c3e50";
    ctx.beginPath();
    ctx.arc( player[0] - cam[0] + x , player[1] - cam[1] + y, size, 0, Math.PI * 2, true );
    ctx.fill();
    var distanceBetweenArms = 360 / arms;
    for(var i = 0; i < arms; ++i){
        drawCircleArm(player[0] + x, player[1] + y, i * distanceBetweenArms, size + 3, reverse);
    }
    ctx.restore();
}

function drawControlCross(x, y, angle){
    ctx.save();
    translateTo([x, y]);
    ctx.rotate(angle.toRad());

    ctx.fillStyle = "#2c3e50";
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.strokeStyle	= "#f00";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(0, 6);
    ctx.stroke();

    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(-2, -2, 4, 4);
    ctx.restore();
}
