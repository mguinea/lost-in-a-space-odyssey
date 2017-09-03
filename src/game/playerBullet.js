/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)
// 4: vel
// 5: timer end
// 6: timer resize
// 7: pool active

function updatePlayerBullet(e, params, i){
    if(e[7] == 0) return;
    // Detroy if timer ends
    if(t > e[5]){
        //playerBullets.splice(i--, 1);
        poolKillItem(playerBullets, i--, 7);
    }
    // Resize after timer
    if(t > e[6]){
        e[2] = 4;
    }
    // Move
    e[0] += e[4] * Math.cos((e[3]).toRad()) * dt;
    e[1] += e[4] * Math.sin((e[3]).toRad()) * dt;
}

function drawPlayerBullet(e){
    if(e[7] == 0) return;
    setContextAtrribute(21, 1);
    fillCircle(e[0], e[1], e[2]);
}
