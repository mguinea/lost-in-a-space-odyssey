function updateEnemyBullet(e, i){
    // Detroy if timer ends
    if(t > e[5]){
        enemyBullets.splice(i--, 1);
    }
    // Resize after timer
    if(t > e[6]){
        e[2] = 4;
    }
    // Move
    e[0] += e[4] * Math.cos((e[3]).toRad()) * dt;
    e[1] += e[4] * Math.sin((e[3]).toRad()) * dt;
}

function drawEnemyBullet(e){
    setContextAtrribute(22, 1);
    fillCircle(e[0], e[1], e[2]);
}
