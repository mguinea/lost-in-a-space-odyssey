function updateStar(e){
    e[3] += e[6] * dt;
}

function drawStar(e){
    setContextAtrribute(e[4], 1);
    fillCircle(e[0], e[1], e[2]);
}

function updateBackStars(e){
    if(getScreenPositionX(e[0]) < 0){
        e[0] = W + cam[0] + random(32, 64);
    }else if(getScreenPositionX(e[0]) > W){
        e[0] = 0 + cam[0] + random(-64, 0);
    }

    if(getScreenPositionY(e[1]) < 0){
        e[1] = H + cam[1] + random(32, 64);
    }else if(getScreenPositionY(e[1]) > H){
        e[1] = 0 + cam[1] + random(-64, 0);
    }
}

function drawBackStar(e){
    setContextAtrribute(17, 1);
    fillCircle( e[0], e[1], e[2]);
}

function updateBackStarsMenu(e){
    return;
    // Update if timer
    if(e[4] > t){
        return;
    }
    var angle = e[3];

    e[0] += 100 * Math.cos(angle * Math.PI) * dt;
    e[1] += 100 * Math.sin(angle * Math.PI) * dt;
    // Resize stars
    e[2] = Math.abs((W / 2 - e[0]) * 0.01);
    // Recycle stars
    if(e[0] > W || e[0] < 0 || e[1] > H || e[1] < 0){
        var angle   = random(0, 360);
        var op      = getOrbitPosition([W/2, H/2], angle, 6);
        var angleDirection = angleTo([W/2, H/2], [op[0], op[1]]);
        e[0] = op[0];
        e[1] = op[1];
        e[2] = 0;
        e[3] = angleDirection;
    }
}

function drawBackStarsMenu(e){
    setContextAtrribute(17, 1);
    fillCircle(e[0], e[1], e[2]);
}
