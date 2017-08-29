// oO ASTEROIDS font with fontSize and align (-1:right, 0:center, 1:left)
// will side effect some ctx.translate() (that you could benefit to make text follow)
function font (txt, fontSize, align) { // eslint-disable-line
  var l = fontSize*11*txt.length;
  ctx.translate(align ? (align>0 ? 0 : -l) : -l/2, 0);
  for (var i=0; i<txt.length; i++) {
    path(FONT[txt[i]] && FONT[txt[i]].map(function (o) {
      return o && [4*fontSize*o[0], 5*fontSize*o[1]];
    }), 1);
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.translate(fontSize*11, 0);
  }
}


function random(min, max){
    return (Math.random() * (max - min) + min);
}
/*
function drawLine(x, y, r, l, w){
    ctx.beginPath();
    ctx.lineWidth = w;
    var rpx = x + Math.cos( (r).toRad() ) * l,
        rpy = y + Math.sin( (r).toRad() ) * l;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(rpx, rpy);
    ctx.stroke();
}*/

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
    return(
            e1[0]*scale  <   e2[0]*scale          +   e2[2]*2*scale     &&
            e1[0]*scale  +   e1[2]*2*scale        >   e2[0]*scale       &&
            e1[1]*scale  <   e2[1]                +   e2[2]*2*scale     &&
            e1[1]*scale  +   e1[2]*2*scale        >   e2[1*scale] );
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
