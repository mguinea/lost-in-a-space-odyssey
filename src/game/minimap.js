function drawMinimap(){
    // Minimap
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 3;
    ctx.fillStyle	= "#3498db";
    ctx.strokeStyle	= "#07507F";
    ctx.beginPath();
    ctx.arc( 128, H - 128, 50, 0, Math.PI * 2, true );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // Enemies
    /*for(var i = enemies.length - 1; >= 0; --i){
        ctx.fillStyle	= "#e74c3c";
        ctx.beginPath();
        ctx.arc( e[0] - cam[0], e[1] - cam[1], e[2], 0, Math.PI * 2, true );
        ctx.fill();
    }*/
}
