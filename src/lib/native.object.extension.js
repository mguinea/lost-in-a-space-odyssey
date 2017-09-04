Number.prototype.toRad = function() {
    return (this / 180) * Math.PI;
}

Number.prototype.toDeg = function() {
    return (this * 180) / Math.PI;
}

Math.random = function(){
    var x = Math.sin(window.seed++) * 10000;
    return x - Math.floor(x);
}
/*
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}*/
/*
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}*/
