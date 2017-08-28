function updatePlayerBullet(e, i){
    // Detroy if timer ends
    if(t > e[5]){
        playerBullets.splice(i--, 1);
    }
    // Resize after timer
    if(t > e[6]){
        e[2] = 4;
    }
    // Move
    e[0] -= e[4] * Math.cos((e[3]).toRad()) * dt;
    e[1] += e[4] * Math.sin((e[3]).toRad()) * dt;
}

function drawPlayerBullet(e){
    ctx.save();
    setContextAtrribute(46, 1);
    ctx.beginPath();
    ctx.arc(e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
}
