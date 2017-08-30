// ------------------
// Core
// ------------------
function gameLoop(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(scale, scale);
    //scale -= 0.08 * dt;
    // Debug stats
    if(DEBUG === true) _fps_.begin();
    // Regulating the time using delta
    currentTime = (new Date()).getTime();
    dt          = (currentTime - lastTime) / 1000;
    frame++;
    t           += dt;
    // Call update game
    update();
    // Call draw game
    draw();
    // Loop game...
    lastTime = currentTime;
    // Debug stats
    if(DEBUG === true) _fps_.end();

    requestAnimationFrame(gameLoop);
}

function processGroup( group, func, params ) {
    for ( var i = group.length - 1; i >= 0; --i ) {
        func( group[i], params, i );
    }
}

function camFocus( e ){
    cam[0] = e[0] - W / 2 / scale;
	cam[1] = e[1] - H / 2 / scale;
}

// Request animation frame setup
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame        ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            function(callback){window.setTimeout(callback, 17);};
})();

// Run game
init();
