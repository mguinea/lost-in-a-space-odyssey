function updateStar(e){
    //e[3] += e[6] * dt;
}

function drawStar(e){
    ctx.save();
    setContextAtrribute(40, 1);
    ctx.beginPath();
    ctx.arc(e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
}

function updateBackStars(e){
    if(e[0] - cam[0] > W){
        e[0] = random(cam[0], cam[0]-128);
        e[1] = random(-H, H/2);
    }
    else if(e[0] - cam[0] < 0){
        e[0] = random(W + cam[0], W + cam[0] + 128);
        e[1] = random(-H, H/2);
    }

    /*if(e[1] - cam[1] > H){
        e[0] = random(-W, W/2);
        e[1] = random(cam[1], cam[1]-128);
    }*/
    /*else if(e[1] - cam[1] < 0){
        e[0] = random(-W, W/2);
        e[1] = random(H + cam[1], H + cam[0] + 128);
    }*/
}

function drawBackStar(e){
    ctx.save();
    setContextAtrribute(0, 1);
    ctx.beginPath();
    ctx.arc(e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
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
