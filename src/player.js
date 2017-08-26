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
];

var turrets = [
    -90, 90, 0, 180
]; // Turret angles

function updatePlayer(){
    // Go where forces say
    var angle  = player[3];
    var forceX = player[4];
    var forceY = player[5];

    player[0] += forceX * dt;
    player[1] += forceY * dt;

    //var speed = dt * player[3];
    /*if(keyMap&keys[65]){
      hero[0]-=speed;
      if(hero[0]<hero[2]) hero[0] = hero[2]; // hero limit on x left
      if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]+=speed;
      if(viewPort[0]>32)viewPort[0]=32;
  } */
    /*player[1] -= 10 * dt;
    player[3] += 10 * dt;*/
}

function drawPlayer(){
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
    drawLine(px, py - r, turrets[0], 18, 6);
    drawLine(px, py + r, turrets[1], 18, 6);
    drawLine(px - r, py, turrets[2], 18, 6);
    drawLine(px + r, py, turrets[3], 18, 6);

    // Draw ship
    setContextAtrribute(41, 1);
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2, true);
    ctx.fill();
    // Draw corridors
    /*setContextAtrribute(49, 1);
    ctx.roundRect(px - r,       py - r / 6, r * 2, r / 3, 8).fill();
    ctx.roundRect(px - r / 6,   py - r,     r / 3, r * 2, 8).fill();*/
    // Draw room
    setContextAtrribute(49, 1);
    ctx.roundRect(px - r + 12, py - r / 6, r * 2 - 24, 38, 8).fill();
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
    for(var i = shipPositions.length - 1; i >= 0; --i){
        //ctx.fillRect(player[0] - cam[0] + shipPositions[i][0], player[1] - cam[1] + shipPositions[i][1], 12, 18);
        drawControlCross(player[0] - cam[0] + shipPositions[i][0], player[1] - cam[1] + shipPositions[i][1]);
    }
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
    /*var pos = 0;
    if(player[6] == 0){
        pos = r;
    }
    if(player[6] == 1){
        pos = -r;
    }
    var chx = px - 6 + pos,           // Player position - half character w
        chy = py - 6;
    // Body
    setContextAtrribute(42, 1);
    ctx.roundRect(chx, chy, 12, 12, 3).fill();
    // Eyes
    setContextAtrribute(43, 1);
    ctx.fillRect(chx + 3, chy + 2, 3, 3);
    ctx.fillRect(chx + 7, chy + 2, 3, 3);
    // Legs
    ctx.fillRect(chx + 2, chy + 12, 3, 2);
    ctx.fillRect(chx + 7, chy + 12, 3, 2);
    */

    ctx.restore();
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

function drawControlCross(x, y){
    ctx.save();
    ctx.fillStyle = "#2c3e50";
    ctx.roundRect(x+1, y+1, 10, 10, 5).fill();

    ctx.strokeStyle	= "#f00";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x+6, y+3);
    ctx.lineTo(x+6, y+9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+3, y+6);
    ctx.lineTo(x+9, y+6);
    ctx.stroke();

    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(x+5, y+5, 2, 2);
    ctx.restore();
}
