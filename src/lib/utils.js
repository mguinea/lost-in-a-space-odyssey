function random(min, max){
    return (Math.random() * (max - min) + min);
}
function getScreenPositionX(x){
    return x-cam[0];
}
function getScreenPositionY(y){
    return y-cam[1];
}

function drawCircleArm(x, y, angularOffset, length, reverse){
    if(!reverse) reverse = 1;
    var rpx = x - Math.cos( (player[3] + angularOffset).toRad() * (reverse) ) * length,
        rpy = y + Math.sin( (player[3] + angularOffset).toRad() * (reverse) ) * length;
    ctx.beginPath();
    ctx.moveTo(x - cam[0], y - cam[1]);
    ctx.lineTo(rpx - cam[0], rpy - cam[1]);
    ctx.stroke();
}

function AABBCollides(e1, e2){ // x, y, r
    /*return(
            this.x  <   rect.x      +   rect.width  &&
            this.x  +   this.width  >   rect.x      &&
            this.y  <   rect.y      +   rect.height &&
            this.y  +   this.height >   rect.y);*/
    /*return(
            e1[0]*scale  <   e2[0]*scale          +   e2[2]*2*scale     &&
            e1[0]*scale  +   e1[2]*2*scale        >   e2[0]*scale       &&
            e1[1]*scale  <   e2[1]                +   e2[2]*2*scale     &&
            e1[1]*scale  +   e1[2]*2*scale        >   e2[1*scale] );*/
    return(
            e1[0]-e1[2]  <   e2[0]-e2[2]    +   e2[2]*2     &&
            e1[0]-e1[2]  +   e1[2]*2        >   e2[0]-e2[2] &&
            e1[1]-e1[2]  <   e2[1]-e2[2]    +   e2[2]*2     &&
            e1[1]-e1[2]  +   e1[2]*2        >   e2[1]-e2[2] );
}

/**
 * distanceTo - Distance between 2 circle
 *
 * @param  {float} e1 description
 * @param  {float} e2 description
 * @return {float}    description
 */
function distanceTo( e1, e2 ){
    var dx = e1[0] - e2[0],
        dy = e1[1] - e2[1];
    return ( Math.sqrt( dx * dx + dy * dy ) ) - ( e1[2] + e2[2] );
}

function collides(e1, e2){
    if(AABBCollides(e1, e2)){
        return distanceTo(e1, e2);
    }
}

function angleTo ( e1, e2 ) {
    return Math.atan2(
        (e2[1]) - (e1[1]),
        (e2[0]) - (e1[0])
    );
}

function translateTo (p) {
    ctx.translate(p[0] - cam[0], p[1] - cam[1]);
}

// lerp method and lerp cam position
function lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t;
}

// Get position x y from another x y with angle
function getOrbitPosition(origin, angle, distance){
	return [origin[0] + Math.cos((angle).toRad()) * distance, origin[1] + Math.sin((angle).toRad()) * distance];
}
