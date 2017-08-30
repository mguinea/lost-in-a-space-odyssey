function updateStar(e){
    e[3] += e[6] * dt;
}

function drawStar(e){
    setContextAtrribute(e[4], 1);
    fillCircle(e[0], e[1], e[2]);
}

function updateBackStars(e){
    if(getScreenPositionX(e[0]) < 0){
        e[0] = W + cam[0];
    }else if(getScreenPositionX(e[0]) > W){
        //e[0] = getScreenPositionX(0) - cam[0];
    }

    if(getScreenPositionY(e[1]) < 0){
        e[1] = H + cam[1];
    }else if(getScreenPositionX(e[0]) > W){
        //e[0] = getScreenPositionX(0) - cam[0];
    }
}

function drawBackStar(e){
    setContextAtrribute(17, 1);
    fillCircle( e[0], e[1], e[2]);
}

function updateBackStarsMenu(e){
    var angle = e[3];

    e[0] += 100 * Math.cos(angle * Math.PI) * dt;
    e[1] += 100 * Math.sin(angle * Math.PI) * dt;
    // Resize stars
    e[2] = Math.abs((W / 2 - e[0]) * 0.01);
    // Recycle stars
    if(e[0] > W || e[0] < 0){
        e[0] = W / 2;
        e[1] = H / 2;
    }
    if(e[1] > H || e[1] < 0){
        e[0] = W / 2;
        e[1] = H / 2;
    }
}

function drawBackStarsMenu(e){
    ctx.save();
    setContextAtrribute(0, 1);
    ctx.beginPath();
    ctx.arc(e[0], e[1], e[2], 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
}
